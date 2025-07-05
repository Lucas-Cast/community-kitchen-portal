import { useFoods } from '@/shared/hooks/useFoods'
import { DataTable } from '../DataTable'
import { useEffect, useState } from 'react'
import { getColumns } from './columns'
import { Food } from '@/shared/types/food'

export default function FoodTable() {
    const foodData = useFoods()
    const [data, setData] = useState(foodData.data || [])

    useEffect(() => {
        setData(foodData.data || [])
    }, [foodData.data])

    function handleDelete(foodToDelete: Food) {
        setData((prev) => prev.filter(food => food.id !== foodToDelete.id))
    }

    const columns = getColumns(handleDelete)

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}