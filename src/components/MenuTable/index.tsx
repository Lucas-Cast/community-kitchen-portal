import { useMenus } from '@/shared/hooks/menu/useMenus'
import { DataTable } from '../DataTable'
import { columns } from './columns'
import { useCallback, useOptimistic, useState } from 'react'

import { Modal } from '../Modal'
import { Button } from '../ui/button'
import { CreateMenuRequest } from '@/shared/types/menu'
import CreateMenuForm from './CreateMenuForm'
import { useCreateMenu } from '@/shared/hooks/menu/useCreateMenu'
import { MenuFormSchema, menuFormSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import { useForm } from 'react-hook-form'
import { useUserContext } from '@/shared/contexts/UserContext'

export default function MenuTable() {
  const menusData = useMenus()
  const [optimisticMenusData] = useOptimistic(menusData.data || [])
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setOpen(true)}>Novo Menu</Button>
      </div>
      <Modal title="Novo Menu" isOpen={open} onClose={() => setOpen(false)} variant="alert">
        <CreateMenuForm />
      </Modal>

      <DataTable columns={columns} data={optimisticMenusData} />
    </div>
  )
}
