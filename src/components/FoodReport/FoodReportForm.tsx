'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Food } from '@/shared/types/food';
import { NutritionFacts } from '@/shared/types/nutrition-facts';
import { useGetMostCaloricFoods } from '@/shared/hooks/foods/useGetMostCaloricFoods';
import { useFindFoodsByMaxNutrient } from '@/shared/hooks/foods/useFindFoodsByMaxNutrient';
import { useFindFoodsByMinNutrient } from '@/shared/hooks/foods/useFindFoodsByMinNutrient';

type ReportFilters = {
  nutrient: keyof NutritionFacts;
  amount: string;
  filterType: 'max' | 'min' | 'most-caloric';
  limit: string;
};

type FoodReportFormProps = {
  onSubmit: (data: Food[]) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  setChartTitle: (title: string) => void;
  onFiltersChange: (filters: ReportFilters) => void; // Nova prop
};

const NUTRIENT_NAMES_PT: Record<keyof NutritionFacts, string> = {
  calories: 'Calorias',
  proteins: 'Proteínas',
  fats: 'Gorduras',
  carbohydrates: 'Carboidratos',
  fiber: 'Fibras',
  sugar: 'Açúcar',
  sodium: 'Sódio',
};

const MAX_LIMIT = 50;

export function FoodReportForm({ onSubmit, setError, setLoading, setChartTitle, onFiltersChange }: FoodReportFormProps) {
  const [filters, setFilters] = useState<ReportFilters>({
    nutrient: 'calories',
    amount: '',
    filterType: 'most-caloric',
    limit: '10',
  });

  const { getMostCaloricFoods, loading: mostCaloricLoading, error: mostCaloricError } = useGetMostCaloricFoods();
  const { findFoodsByMaxNutrient, loading: maxNutrientLoading, error: maxNutrientError } = useFindFoodsByMaxNutrient();
  const { findFoodsByMinNutrient, loading: minNutrientLoading, error: minNutrientError } = useFindFoodsByMinNutrient();

  // Atualiza o componente pai sempre que os filtros mudarem
  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const limit = Number(filters.limit);
    if (isNaN(limit) || limit < 1 || limit > MAX_LIMIT) {
      setError(`O limite deve ser um número entre 1 e ${MAX_LIMIT}.`);
      setLoading(false);
      return;
    }

    try {
      let foods: Food[] = [];
      if (filters.filterType === 'most-caloric') {
        foods = await getMostCaloricFoods(1, limit);
        if (mostCaloricError) throw new Error(mostCaloricError);
      } else if (filters.filterType === 'max') {
        foods = await findFoodsByMaxNutrient(Number(filters.amount), filters.nutrient);
        if (maxNutrientError) throw new Error(maxNutrientError);
        foods.sort((a, b) => (b.nutritionFacts[filters.nutrient] || 0) - (a.nutritionFacts[filters.nutrient] || 0));
      } else if (filters.filterType === 'min') {
        foods = await findFoodsByMinNutrient(Number(filters.amount), filters.nutrient);
        if (minNutrientError) throw new Error(minNutrientError);
        foods.sort((a, b) => (a.nutritionFacts[filters.nutrient] || 0) - (b.nutritionFacts[filters.nutrient] || 0));
      }
      console.log('Foods fetched:', foods);
      onSubmit(foods.slice(0, limit));
      setChartTitle(
        filters.filterType === 'most-caloric'
          ? 'Comidas Mais Calóricas'
          : `Comidas com ${NUTRIENT_NAMES_PT[filters.nutrient]} ${filters.filterType === 'max' ? 'até' : 'a partir de'} ${
              filters.amount
            }`,
      );
    } catch (err) {
      setError((err as Error).message || 'Erro ao gerar gráfico!');
      console.error('Error in handleSubmit:', err);
    } finally {
      setLoading(false);
    }
  };

  const isLoading = mostCaloricLoading || maxNutrientLoading || minNutrientLoading;

  return (
    <form id="food-report-form" onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 mb-6">
      <div className="flex flex-col gap-2">
        <Label>Tipo de Gráfico</Label>
        <Select
          value={filters.filterType}
          onValueChange={value => {
            const newFilterType = value as 'max' | 'min' | 'most-caloric';
            setFilters(prev => ({
              ...prev,
              filterType: newFilterType,
              nutrient: newFilterType === 'most-caloric' ? 'calories' : prev.nutrient,
              amount: newFilterType === 'most-caloric' ? '' : prev.amount,
            }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecionar tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="most-caloric">Mais Calóricas</SelectItem>
            <SelectItem value="max">Máximo de Nutriente</SelectItem>
            <SelectItem value="min">Mínimo de Nutriente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Limite de Itens no Gráfico (1 a {MAX_LIMIT})</Label>
        <Input
          type="number"
          placeholder={`Digite o limite (máx. ${MAX_LIMIT})`}
          value={filters.limit}
          onChange={e => setFilters(prev => ({ ...prev, limit: e.target.value }))}
          min="1"
          max={MAX_LIMIT}
        />
      </div>

      {filters.filterType !== 'most-caloric' && (
        <>
          <div className="flex flex-col gap-2">
            <Label>Nutriente</Label>
            <Select
              value={filters.nutrient}
              onValueChange={value => setFilters(prev => ({ ...prev, nutrient: value as keyof NutritionFacts }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecionar nutriente" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(NUTRIENT_NAMES_PT).map(nutrient => (
                  <SelectItem key={nutrient} value={nutrient}>
                    {NUTRIENT_NAMES_PT[nutrient as keyof NutritionFacts]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Quantidade {filters.filterType === 'max' ? 'máxima do nutriente' : 'mínima do nutriente'}</Label>
            <Input
              type="number"
              placeholder={`Digite a quantidade (${filters.filterType === 'max' ? 'máximo' : 'mínimo'})`}
              value={filters.amount}
              onChange={e => setFilters(prev => ({ ...prev, amount: e.target.value }))}
            />
          </div>
        </>
      )}

      <div className="md:col-span-2">
        <Button type="submit" disabled={isLoading || (filters.filterType !== 'most-caloric' && !filters.amount) || !filters.limit}>
          Gerar Gráfico
        </Button>
      </div>
    </form>
  );
}