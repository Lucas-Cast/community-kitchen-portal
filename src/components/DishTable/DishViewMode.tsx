import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useState } from 'react'

type Props = {
  viewMode: 'all' | 'healthy' | 'unhealthy'
  onChange: (value: 'all' | 'healthy' | 'unhealthy') => void
}

export default function DishViewMode({ viewMode, onChange }: Props) {
  return (
    <Select value={viewMode} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Selecione como deseja visualizar pratos" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Ver todos</SelectItem>
        <SelectItem value="healthy">Ver saudáveis</SelectItem>
        <SelectItem value="unhealthy">Ver não saudáveis</SelectItem>
      </SelectContent>
    </Select>
  )
}
