'use client'

import { useState } from 'react';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/ui/button';
import MenuRequirementDeactivateForm from './MenuRequirementDeactivateForm';
import { MenuRequirement } from '@/shared/types/menu-requirement';

interface Props {
  onDeactivate?: (menuRequirement: MenuRequirement) => void;
  refetch?: () => void;
}

export default function MenuRequirementDeactivateButton({ onDeactivate, refetch }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-red-600 hover:bg-red-700 text-white">
        🚫 Desativar Requisito
      </Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {}}
        title="Desativar Menu"
        confirmText="Desativar"
        cancelText="Cancelar"
        formId="deactivate-menu-form"
        variant="alert"
      >
        <MenuRequirementDeactivateForm
          onDeactivate={onDeactivate}
          onClose={() => setOpen(false)}
          refetch={refetch}
        />
      </Modal>
    </>
  );
}