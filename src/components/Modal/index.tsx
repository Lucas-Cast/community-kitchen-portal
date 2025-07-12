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
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onCancel?: () => void
  onConfirm?: () => void
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  children?: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'form' | 'alert' | 'success' | 'error' | 'viewer'
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'scale'
  position?: 'center' | 'top'
  formId?: string
}

const sizeClasses: Record<NonNullable<ModalProps['size']>, string> = {
  xs: 'w-[16rem] sm:w-[20rem] max-h-[80vh]',
  sm: 'w-[20rem] sm:w-[24rem] max-h-[80vh]',
  md: 'w-[32rem] sm:w-[40rem] max-h-[85vh]',
  lg: 'w-[48rem] sm:w-[60rem] max-h-[90vh]',
  xl: 'w-[64rem] sm:w-[80rem] max-h-[90vh]',
}

const animationClasses: Record<NonNullable<ModalProps['animation']>, string> = {
  fade: 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  'slide-up':
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-16 data-[state=open]:slide-in-from-bottom-16',
  'slide-down':
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-16 data-[state=open]:slide-in-from-top-16',
  scale:
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
}

const positionClasses: Record<NonNullable<ModalProps['position']>, string> = {
  center: 'top-[50%] translate-y-[-50%]',
  top: 'top-4 translate-y-0',
}

const variantClasses: Record<NonNullable<ModalProps['variant']>, string> = {
  default: 'border border-gray-300',
  form: 'border-2 border-blue-500',
  alert: 'border-2 border-yellow-500',
  success: 'border-2 border-green-500',
  error: 'border-2 border-red-500',
  viewer: 'border border-gray-300',
}

export const Modal = ({
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText,
  children,
  size = 'md',
  variant = 'default',
  animation = 'fade',
  position = 'center',
  formId,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent
        className={cn(
          sizeClasses[size],
          animationClasses[animation],
          positionClasses[position],
          variantClasses[variant],
          'bg-background fixed left-[50%] translate-x-[-50%] z-50 grid gap-4 rounded-lg border p-6 shadow-lg duration-200 max-w-[calc(100%-2rem)] sm:max-w-[var(--max-w)]'
        )}
        style={
          {
            '--max-w': sizeClasses[size].match(/sm:w-\[(.*?)\]/)?.[1],
          } as React.CSSProperties
        }
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children && <div className="py-4 overflow-y-auto max-h-[70vh]">{children}</div>}

        <DialogFooter>
          {variant !== 'viewer' && (
            <>
              <Button variant="ghost" onClick={onCancel ?? onClose}>
                {cancelText}
              </Button>
              {(onConfirm || formId) && (
                <Button
                  onClick={!formId ? onConfirm : undefined}
                  type={formId ? 'submit' : 'button'}
                  form={formId}
                >
                  {confirmText}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
       
    </Dialog>
  )
}
