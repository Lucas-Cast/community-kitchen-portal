import { Dish } from '@/shared/types/dish'
import { useEffect, useState } from 'react'
import { useDishHealthyStatus } from '@/shared/hooks/dishes/useDishHealthyStatus'
import { useDishNutritionSummary } from '@/shared/hooks/dishes/useDishNutritionSummary'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

type DishDetailsProps = {
  data: Dish
}

export function DishDetails({ data }: DishDetailsProps) {
  const { healthyInfo, fetchHealthyStatus, loading: loadingHealthy } = useDishHealthyStatus()
  const {
    nutritionSummary,
    fetchNutritionSummary,
    loading: loadingNutrition,
  } = useDishNutritionSummary()

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function fetchAll() {
      await Promise.all([fetchHealthyStatus(data.id), fetchNutritionSummary(data.id)])
      setLoaded(true)
    }

    fetchAll()
  }, [data.id])

  const isLoading = loadingHealthy || loadingNutrition || !loaded

  if (isLoading) {
    return <p className="text-center py-8">Carregando detalhes do prato...</p>
  }

  if (!healthyInfo || !nutritionSummary) {
    return <p className="text-center py-8 text-red-500">Erro ao carregar os dados do prato.</p>
  }

  const facts = nutritionSummary.nutritionFacts

  const chartData = [
    { name: 'Calorias', value: facts.calories },
    { name: 'Proteínas (g)', value: facts.proteins },
    { name: 'Carboidratos (g)', value: facts.carbohydrates },
    { name: 'Gorduras (g)', value: facts.fats },
    { name: 'Fibras (g)', value: facts.fiber },
    { name: 'Sódio (mg)', value: facts.sodium },
    { name: 'Açúcares (g)', value: facts.sugar },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{nutritionSummary.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{nutritionSummary.description}</p>
      </CardHeader>

      <CardContent className="space-y-2">
        <div>
          <strong>Ingredientes:</strong> {nutritionSummary.foods.map(f => f.name).join(', ')}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição Nutricional</CardTitle>
          </CardHeader>
          <CardContent className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} />

                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="p-2 rounded-md border mt-4 text-sm">
          {healthyInfo.healthy ? (
            <span className="text-green-600 font-semibold">
              ✅ Este prato é considerado saudável!
            </span>
          ) : (
            <span className="text-red-600 font-semibold">
              ❌ Este prato não é considerado saudável.
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
