import { useState } from 'react';
import { foodService } from '@/shared/services/food/food';
import { Food } from '@/shared/types/food';
import { toast } from 'sonner';

export function useFoodSearch() {
  const [results, setResults] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function search(term: string) {
    if (!term.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const foods = await foodService.searchFoodsByName(term);
      setResults(foods);
    } catch (err) {
      console.error(err);
      setError('Erro ao buscar comidas.');
      toast.error('Erro ao buscar comidas.');
    } finally {
      setLoading(false);
    }
  }

  return { search, results, loading, error };
}