
'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
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

const sizeClasses: Record<NonNullable<ModalWrapperProps['size']>, string> = {
  sm: 'w-[16rem] sm:w-[20rem]', // 256px - 320px
  md: 'w-[32rem] sm:w-[40rem]', // 512px - 640px
  lg: 'w-[48rem] sm:w-[60rem]', // 768px - 960px
  xl: 'w-[64rem] sm:w-[80rem]', // 1024px - 1280px
  full: 'w-full h-full max-w-none',
}

export const Modal = ({
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
      <DialogContent className={sizeClasses[size]} size={size} variant={variant}>
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
