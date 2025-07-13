import { useForm } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '../ui/form'
import { useCallback, useOptimistic } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useUserContext } from '@/shared/contexts/UserContext'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import { Button } from '../ui/button'
import { CreateMenuAttendanceRequest, MenuAttendance } from '@/shared/types/menu-attendance'
import { useCustomer } from '@/shared/hooks/customer/useCustomer'
import { useMenus } from '@/shared/hooks/menu/useMenus'
import { useUpsertAttendance } from '@/shared/hooks/menu-attendance/useUpsertAttendance'
import { MenuAttendanceFormSchema, menuAttendanceFormSchema } from './schema'

export default function CreateMenuForm() {
  const { data: menuData } = useMenus()
  const { data: customerData } = useCustomer()
  const [optimisticCustomerData] = useOptimistic(customerData || [])
  const [optimisticMenuData] = useOptimistic(menuData || [])
  const { createAttendance } = useUpsertAttendance()
  const form = useForm<MenuAttendanceFormSchema>({
    resolver: zodResolver(menuAttendanceFormSchema),
  })

  const onSubmit = useCallback(async () => {
    if (!optimisticCustomerData || !optimisticMenuData) return

    const formValues = form.getValues()

    const customerId = optimisticCustomerData?.filter(
      customer => customer.name === formValues.customerName
    )[0]?.id

    const request: CreateMenuAttendanceRequest = {
      menuId: Number(formValues.menuId),
      customerId,
    }

    await createAttendance(request).then(() => window.location.reload())
  }, [optimisticMenuData, optimisticCustomerData])

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="menuId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Id do menu</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="Selecione um menu" />
                  </SelectTrigger>
                  <SelectContent>
                    {optimisticMenuData?.map(menu => (
                      <SelectItem value={menu.id.toString()} key={menu.id}>
                        {menu.id}
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
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {optimisticCustomerData?.map(customer => (
                      <SelectItem value={customer.name} key={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Criar atendimento</Button>
        </div>
      </form>
    </Form>
  )
}
