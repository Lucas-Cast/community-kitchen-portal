import { useDishes } from '@/shared/hooks/useDishes'
import { DataTable } from '../DataTable'
import { columns } from './columns'
import { useOptimistic } from 'react'

export default function DishTable() {
  const dishData = useDishes()
  const [optimisticDishData] = useOptimistic(dishData.data || [])
  
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={optimisticDishData} />
    </div>
  )
}