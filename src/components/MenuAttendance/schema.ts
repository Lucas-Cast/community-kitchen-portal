import z from 'zod'

export const menuAttendanceFormSchema = z.object({
  menuId: z.string(),
  customerName: z.string(),
})

export type MenuAttendanceFormSchema = z.infer<typeof menuAttendanceFormSchema>
