'use client'

import { useEffect, useState } from 'react'
import { DataTable } from '../DataTable'
import { getColumns } from './columns'
import { DailyEvent } from '@/shared/types/daily-event'
import { useDailyEvents } from '@/shared/hooks/dailyEvents/useDailyEvents'

export default function DailyEventTable() {
  const dailyEventData = useDailyEvents()
  const [data, setData] = useState<DailyEvent[]>(dailyEventData.data || [])

  useEffect(() => {
    setData(dailyEventData.data || [])
  }, [dailyEventData.data])

  function handleDelete(dailyEventToDelete: DailyEvent) {
    setData(prev => prev.filter(dish => dish.id !== dailyEventToDelete.id))
  }

  function handleEdit(updatedDailyEvent: DailyEvent) {
    setData(prev => prev.map(f => (f.id === updatedDailyEvent.id ? updatedDailyEvent : f)))
  }
  
  if (dailyEventData.error) return <p className="text-red-500">Erro: {dailyEventData.error}</p>
  if (dailyEventData.isLoading) return <p className="text-gray-500">Carregando eventos diários...</p>

  const columns = getColumns(handleEdit, handleDelete)

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}