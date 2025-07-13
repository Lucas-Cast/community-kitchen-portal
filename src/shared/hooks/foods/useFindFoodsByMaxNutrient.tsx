import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { foodService } from '@/shared/services/food/food';
import { Food } from '@/shared/types/food';
import { NutritionFacts } from '@/shared/types/nutrition-facts';

export function useFindFoodsByMaxNutrient(onSuccess?: (foods: Food[]) => void, onError?: (err: unknown) => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findFoodsByMaxNutrient = useCallback(
    async (amount: number, nutrient: keyof NutritionFacts) => {
      try {
        setLoading(true);
        setError(null);
        const foods = await foodService.findFoodsByMaxNutrientAmount(amount, nutrient);
        onSuccess?.(foods);
        return foods;
      } catch (err) {
        const errorMessage = (err as Error).message || `Erro ao buscar alimentos com ${nutrient} até ${amount}.`;
        setError(errorMessage);
        toast.error(errorMessage);
        onError?.(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [onSuccess, onError],
  );

  return { findFoodsByMaxNutrient, loading, error };
}