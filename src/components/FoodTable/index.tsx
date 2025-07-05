import { useFoods } from '@/shared/hooks/useFoods'
import { DataTable } from '../DataTable'
import { useOptimistic } from 'react'
import { columns } from './columns'

export default function FoodTable() {
  const foodData = useFoods()
  const [optimisticFoodData] = useOptimistic(foodData.data || [])
  
  return (
    <div className="container mx-auto py-10">
        <DataTable columns={columns} data={optimisticFoodData}></DataTable>
    </div>
  )
}