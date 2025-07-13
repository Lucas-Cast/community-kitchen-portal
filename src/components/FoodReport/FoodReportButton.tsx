'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/components/ui/button';
import { ReactNode } from 'react';
import { Modal } from '../Modal';

type FoodReportButtonProps = {
  label?: string;
  children: ReactNode;
} & React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function FoodReportButton({ label = 'Gerar Relatório', children, ...props }: FoodReportButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} {...props}>
        {label}
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Relatório Nutricional de Comida"
        size="xl"
        variant="form"
        animation="fade"
        position="center"
        formId="food-report-form"
      >
        {children}
      </Modal>
    </>
  );
}