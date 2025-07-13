import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '../ui/form'
import { useDailyEvents } from '@/shared/hooks/daily-event/useDailyEvent'
import { useCallback, useOptimistic } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useDishes } from '@/shared/hooks/dishes/useDishes'
import { MultiSelect } from '../MultiSelect'
import { menuFormSchema, MenuFormSchema } from './schema'
import { useUserContext } from '@/shared/contexts/UserContext'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import { useUpsertMenu } from '@/shared/hooks/menu/useUpsertMenu'
import { CreateMenuRequest, Menu } from '@/shared/types/menu'
import { Button } from '../ui/button'
import { WeekDay } from '@/shared/enums/week-days'

interface CreateMenuFormProps {
  data?: Menu
}

export default function CreateMenuForm({ data }: CreateMenuFormProps) {
  const { data: dailyEventData } = useDailyEvents()
  const { data: dishesData } = useDishes()
  const [optmisticDishesData] = useOptimistic(dishesData || [])
  const [optimisticdailyEventData] = useOptimistic(dailyEventData || [])
  const user = useUserContext()
  const { createMenu, updateMenu } = useUpsertMenu()
  const form = useForm<MenuFormSchema>({
    resolver: zodResolver(menuFormSchema),
    defaultValues: {
      availability: data?.availableDay,
      meal: data?.dailyEvent?.name || '',
      dishes: data?.dishes.map(dish => dish.name) || [],
      createdBy: data?.createdBy || user.user?.nome || '',
    },
  })

  const onSubmit = useCallback(async () => {
    if (!optmisticDishesData || !optimisticdailyEventData) return

    const formValues = form.getValues()

    const mealId = optimisticdailyEventData?.filter(
      dailyEvent => dailyEvent.name === formValues.meal
    )[0]?.id

    const dishesIds = optmisticDishesData
      ?.filter(dish => formValues.dishes.includes(dish.name))
      .map(dish => dish.id)

    const request: CreateMenuRequest = {
      availableDay: formValues.availability,
      dishes: dishesIds,
      dailyEventId: mealId,
      activationDate: new Date().toISOString(),
    }

    if (!data) await createMenu(request).then(() => window.location.reload())
    else await updateMenu(data.id, request).then(() => window.location.reload())
  }, [createMenu, user.user?.nome, optimisticdailyEventData, optmisticDishesData, data])

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="availability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Disponibilidade</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="Selecione um dia da semana" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(WeekDay).map(weekDay => (
                      <SelectItem value={weekDay} key={weekDay}>
                        {weekDay}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="meal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Refeição</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="Selecione uma refeição" />
                  </SelectTrigger>
                  <SelectContent>
                    {optimisticdailyEventData?.map(dailyEvent => (
                      <SelectItem value={dailyEvent.name} key={dailyEvent.id}>
                        {dailyEvent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dishes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pratos</FormLabel>
              <FormControl>
                <MultiSelect
                  options={
                    optmisticDishesData?.map(dish => ({
                      value: dish.name,
                      label: dish.name,
                    })) || []
                  }
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Selecione os pratos"
                  searchPlaceholder="Buscar prato..."
                  emptyText="Nenhum prato encontrado."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="createdBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Criado por</FormLabel>
              <FormControl>
                <Input placeholder="Criado por" {...field} value={field.value} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Criar Menu</Button>
        </div>
      </form>
    </Form>
  )
}
