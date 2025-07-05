
'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog'
import { Button } from '../ui/button'
import { ReactNode } from 'react'

interface ModalWrapperProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  children?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  variant?: 'default' | 'form' | 'alert'
  hideFooter?: boolean
}

export const ModalWrapper = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Salvar',
  cancelText = 'Cancelar',
  children,
  size = 'md',
  variant = 'default',
  hideFooter = false,
}: ModalWrapperProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent size={size} variant={variant}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="py-4">{children}</div>

        {!hideFooter && (
          <DialogFooter>
            <Button variant="ghost" onClick={onClose}>
              {cancelText}
            </Button>
            {onConfirm && <Button onClick={onConfirm}>{confirmText}</Button>}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}  
