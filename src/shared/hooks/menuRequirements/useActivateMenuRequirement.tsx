import { menuRequirementService } from '@/shared/services/menuRequirement/menuRequirement';
import { MenuRequirement } from '@/shared/types/menu-requirement';
import { useState } from 'react';
import { toast } from 'sonner';

export function useActivateMenuRequirement(onSuccess?: (menu: MenuRequirement) => void) {
  const [loading, setLoading] = useState(false);

  async function activate(id: number) {
    try {
      setLoading(true);
      const activated = await menuRequirementService.activateMenuRequirement(id);
      toast.success('Requisitos do menu ativado com sucesso!', {
        id: `activate-${id}`,
      });
      onSuccess?.(activated);
    } catch (err) {
      toast.error('Erro ao ativar o requisito!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return { activate, loading };
}