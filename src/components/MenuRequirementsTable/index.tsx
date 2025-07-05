import { useActiveMenuRequirements } from '@/shared/hooks/useActiveMenuRequirements'
import { DataTable } from '../DataTable'
import { columns } from './columns'
import { useOptimistic } from 'react'

export default function ActiveMenuRequirementTable() {
  const { data, isLoading, error } = useActiveMenuRequirements()
  const [optimisticData] = useOptimistic(data || [])

  return (
    <div className="container mx-auto py-10 space-y-4">
      {error && <p className="text-red-500">Erro: {error}</p>}
      {isLoading && <p className="text-gray-500">Carregando requisitos...</p>}

      {!isLoading && !error && (
        <DataTable columns={columns} data={optimisticData} />
      )}
    </div>
  )
}
