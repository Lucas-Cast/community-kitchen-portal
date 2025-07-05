'use client'

import { Card } from '@/components/ui/card'

interface AverageCustomerAgeCardProps {
  averageAge: number | null
  loading: boolean
}

export function AverageCustomerAgeCard({ averageAge, loading }: AverageCustomerAgeCardProps) {
  return (
    <Card className="w-60 max-w-xs border shadow-sm rounded-md bg-white px-4 py-2">
      <div className="flex items-center justify-between h-full">
        <span className="text-sm font-medium text-gray-700">Idade média</span>
        <span className="text-lg font-semibold text-gray-900">
          {loading ? '...' : averageAge !== null ? `${averageAge.toFixed(1)} anos` : 'N/A'}
        </span>
      </div>
    </Card>
  )
}
