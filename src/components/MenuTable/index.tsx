import { useMenus } from '@/shared/hooks/menu/useMenus'
import { DataTable } from '../DataTable'
import { columns } from './columns'
import { useOptimistic, useState } from 'react'

import { Modal } from '../Modal'
import { Button } from '../ui/button'
import CreateMenuForm from './CreateMenuForm'

export default function MenuTable() {
  const menusData = useMenus()
  const [optimisticMenusData] = useOptimistic(menusData.data || [])
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setOpen(true)}>Novo Menu</Button>
      </div>
      <Modal title="Novo Menu" isOpen={open} onClose={() => setOpen(false)} variant="viewer">
        <CreateMenuForm />
      </Modal>

      <DataTable columns={columns} data={optimisticMenusData} />
    </div>
  )
}
