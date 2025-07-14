'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MenuRequirement } from '@/shared/types/menu-requirement';
import { Modal } from '../Modal';
import MenuRequirementActivateForm from './MenuRequerimentActivateForm';

interface Props {
  onActivate?: (menuRequirement: MenuRequirement) => void;
  refetch?: () => void;
}

export default function MenuRequirementActivateButton({ onActivate, refetch }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant={'outline'}>
        Ativar Requisito
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Ativar Requisitos do Menu"
        size="md"
        confirmText="Ativar"
        cancelText="Cancelar"
        variant="form"
        animation="fade"
        position="center"
        formId="activate-menu-form"
      >
        <MenuRequirementActivateForm onActivate={onActivate} onClose={() => setOpen(false)} refetch={refetch} />
      </Modal>
    </>
  );
}