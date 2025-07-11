'use client'

import { useEffect, useState } from 'react'
import { DataTable } from '../DataTable'
import { getColumns } from './columns'
import { DailyEvent } from '@/shared/types/daily-event'
import { useDailyEvents } from '@/shared/hooks/dailyEvents/useDailyEvents'
import CreateDailyEventButton from './DailyEventCreateButton'

export default function DailyEventTable() {
  const dailyEventData = useDailyEvents()
  const [data, setData] = useState<DailyEvent[]>(dailyEventData.data || [])

  useEffect(() => {
    setData(dailyEventData.data || [])
  }, [dailyEventData.data])

  function handleCreate(newDailyEvent: DailyEvent) {
    setData(prev => [...prev, newDailyEvent])
  }

  function handleEdit(updatedDailyEvent: DailyEvent) {
    setData(prev => prev.map(de => (de.id === updatedDailyEvent.id ? updatedDailyEvent : de)))
  }

    function handleDelete(dailyEventToDelete: DailyEvent) {
    setData(prev => prev.filter(de => de.id !== dailyEventToDelete.id))
  }

  if (dailyEventData.error) return <p className="text-red-500">Erro: {dailyEventData.error}</p>
  if (dailyEventData.isLoading) return <p className="text-gray-500">Carregando eventos diários...</p>

  const columns = getColumns(handleEdit, handleDelete)

  return (
    <div className="container mx-auto py-10">
        <div className="flex justify-end mb-4">
        <CreateDailyEventButton onCreate={handleCreate} />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}