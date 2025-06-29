import { useMenus } from '@/shared/hooks/useMenus'
import { DataTable } from '../DataTable'
import { columns } from './columns'
import { useOptimistic } from 'react'

export default function MenuTable() {
  const menusData = useMenus()
  const [optimisticMenusData] = useOptimistic(menusData.data || [])

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={optimisticMenusData} />
    </div>
  )
}
