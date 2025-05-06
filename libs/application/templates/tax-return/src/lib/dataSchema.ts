import { z } from 'zod'

export const baseEntitySchema = z.object({
  title: z.string(),
  value: z.string(),
  details: z.string().optional(),
})

const lastYearIncomeSchema = z
  .object({
    salary: z.array(baseEntitySchema).optional(),
    benefits: z.array(baseEntitySchema).optional(),
    compensation: z.array(baseEntitySchema).optional(),
  })
  .partial()

const generalInfoSchema = z
  .object({
    user: z.object({
      name: z.string().optional(),
      nationalId: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
    }),
    contact: z.object({
      email: z.string().optional(),
      phone: z.string().optional(),
    }),
  })
  .partial()

export const applicationSchema = z.object({
  generalInfo: generalInfoSchema.optional(),
  incomeLastYear: lastYearIncomeSchema.optional(),
})

export type applicationSchema = z.infer<typeof applicationSchema>
