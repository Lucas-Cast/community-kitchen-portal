import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { menuRequirementService } from '@/shared/services/menuRequirement/menuRequirement';
import { MenuRequirement } from '@/shared/types/menu-requirement';

export function useInactiveMenuRequirements() {
  const [data, setData] = useState<MenuRequirement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchInactiveMenuRequirements() {
    try {
      setLoading(true);
      setError(null);
      const inactiveRequirements = await menuRequirementService.getInactiveMenuRequirements();
      setData(inactiveRequirements);
    } catch (err) {
      const errorMessage = 'Erro ao buscar requisitos inativos do menu!';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInactiveMenuRequirements();
  }, []);

  return { data, loading, error, refetch: fetchInactiveMenuRequirements };
}