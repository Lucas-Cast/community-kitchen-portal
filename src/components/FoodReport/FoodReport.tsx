'use client';

import { useState } from 'react';
import { Food } from '@/shared/types/food';
import { FoodReportButton } from './FoodReportButton';
import { FoodReportForm } from './FoodReportForm';
import { NutritionFacts } from '@/shared/types/nutrition-facts';
import { GenericBarChart } from '../BarChart/GenericBarChart';


type ReportFilters = {
  nutrient: keyof NutritionFacts;
  amount: string;
  filterType: 'max' | 'min' | 'most-caloric';
  limit: string;
};

export default function FoodReport() {
  const [data, setData] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chartTitle, setChartTitle] = useState<string>('');
  const [filters, setFilters] = useState<ReportFilters>({
    nutrient: 'calories',
    amount: '',
    filterType: 'most-caloric',
    limit: '10',
  });

  const truncateLabel = (label: string) => {
    return label.length > 15 ? `${label.slice(0, 12)}...` : label;
  };

  return (
    <FoodReportButton>
      <>
        <FoodReportForm
          onSubmit={data => setData(data)}
          setError={setError}
          setLoading={setLoading}
          setChartTitle={setChartTitle}
          onFiltersChange={setFilters}
        />
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {loading && <p className="text-gray-500 mt-4">Carregando...</p>}
        {data.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">{chartTitle}</h3>
            <GenericBarChart
              data={data.map(food => ({
                name: food.name || 'Sem Nome',
                value: food.nutritionFacts ? (food.nutritionFacts[filters.nutrient] as number) || 0 : 0,
              }))}
              widthPerItem={80}
              barSize={Number(filters.limit) > 20 ? 30 : 40}
              truncateLabel={truncateLabel}
            />
          </div>
        )}
        {data.length === 0 && !loading && !error && (
          <p className="text-gray-500 mt-4">Nenhum dado para exibir. Gere um gráfico.</p>
        )}
      </>
    </FoodReportButton>
  );
}