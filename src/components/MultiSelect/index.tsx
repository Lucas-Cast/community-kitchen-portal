import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export interface MultiSelectOption {
  value: string
  label: string
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
  disabled?: boolean
  maxDisplayItems?: number
}

export function MultiSelect({
  options,
  value = [],
  onValueChange,
  placeholder = 'Selecione itens...',
  searchPlaceholder = 'Buscar...',
  emptyText = 'Nenhum item encontrado.',
  className,
  disabled = false,
  maxDisplayItems = 3,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (selectedValue: string) => {
    const newValues = value.includes(selectedValue)
      ? value.filter(v => v !== selectedValue)
      : [...value, selectedValue]

    onValueChange(newValues)
  }

  const selectedOptions = options.filter(option => value.includes(option.value))

  const getDisplayText = () => {
    if (selectedOptions.length === 0) {
      return placeholder
    }

    if (selectedOptions.length <= maxDisplayItems) {
      return selectedOptions.map(option => option.label).join(', ')
    }

    const visibleItems = selectedOptions.slice(0, maxDisplayItems)
    const remainingCount = selectedOptions.length - maxDisplayItems

    return `${visibleItems.map(option => option.label).join(', ')}... (+${remainingCount})`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-full justify-between bg-white h-10',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          disabled={disabled}
        >
          <span className="text-sm truncate text-left">{getDisplayText()}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>{emptyText}</CommandEmpty>
          <div
            className="max-h-64 overflow-y-auto overscroll-contain"
            style={{
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <CommandGroup>
              {options.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value.includes(option.value) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
