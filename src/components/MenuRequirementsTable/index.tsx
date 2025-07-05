import { useActiveMenuRequirements } from '@/shared/hooks/useActiveMenuRequirements'
import { columns } from './columns'
import { useOptimistic } from 'react'
import { VerticalDataTable } from '../VerticalDataTable'
import { MenuRequirement } from '@/shared/types/menu-requirement'

export default function ActiveMenuRequirementTable() {
  const { data, isLoading, error } = useActiveMenuRequirements()
  const [optimisticData] = useOptimistic(data || [])

  return (
    <div className="container mx-auto py-10 space-y-4">
      {error && <p className="text-red-500">Erro: {error}</p>}
      {isLoading && <p className="text-gray-500">Carregando requisitos...</p>}

      {!isLoading && !error && (
        <VerticalDataTable columns={columns} data={optimisticData} title={(row: MenuRequirement) => `Requisitos do Menu - ${row.id}`}/>
      )}

      
    </div>
  )
}
