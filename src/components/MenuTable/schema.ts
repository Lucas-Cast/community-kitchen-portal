import z from 'zod'

export const menuFormSchema = z.object({
  availability: z.string(),
  meal: z.string(),
  dishes: z.array(z.string()),
  createdBy: z.string(),
})

export type MenuFormSchema = z.infer<typeof menuFormSchema>
