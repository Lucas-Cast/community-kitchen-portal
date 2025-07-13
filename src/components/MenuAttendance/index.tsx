import { DataTable } from '../DataTable'
import { columns } from './columns'
import { useEffect, useOptimistic, useState } from 'react'

import { Modal } from '../Modal'
import { Button } from '../ui/button'
import { useFetchResource } from '@/shared/hooks/useFetchResource'
import { MenuAttendance } from '@/shared/types/menu-attendance'
import { Routes } from '@/shared/enums/routes'
import MenuAttendanceForm from './MenuAttendanceForm'

export default function MenuAttendanceTable() {
  const { fetchData, data: menuAttendance } = useFetchResource<MenuAttendance[]>()
  const [optimisticMenuAttendanceData] = useOptimistic(menuAttendance || [])
  useEffect(() => {
    fetchData(Routes.MENU_ATTENDANCE)
  }, [fetchData])
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setOpen(true)}>Novo Atendimento</Button>
      </div>
      <Modal title="Novo Menu" isOpen={open} onClose={() => setOpen(false)} variant="viewer">
        <MenuAttendanceForm />
      </Modal>

      <DataTable columns={columns} data={optimisticMenuAttendanceData} />
    </div>
  )
}
