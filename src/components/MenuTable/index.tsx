import { useMenus } from '@/shared/hooks/useMenus'
import { DataTable } from '../DataTable'
import { columns } from './columns'
import { useOptimistic, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Modal } from '../Modal'

export default function MenuTable() {
  const menusData = useMenus()
  const [optimisticMenusData] = useOptimistic(menusData.data || [])
  const [open, setOpen] = useState(false)

  return (
    <div className="container mx-auto py-10 space-y-4">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={optimisticMenusData} />
      </div>
    </div>
  )
}