import { z } from 'zod'
import { requirements } from './messages'
import { YesOrNoEnum } from '@island.is/application/core'

export const baseEntitySchema = z.object({
  title: z.string(),
  value: z.string(),
  details: z.string().optional(),
})

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

const lastYearIncomeSchema = z
  .object({
    salary: z.array(baseEntitySchema).optional(),
    benefits: z.array(baseEntitySchema).optional(),
    compensation: z.array(baseEntitySchema).optional(),
  })
  .partial()

const endOfYearSchema = z
  .object({
    housing: z.array(baseEntitySchema).optional(),
    vehicles: z.array(baseEntitySchema).optional(),
  })
  .partial()

export const applicationSchema = z.object({
  generalInfo: generalInfoSchema.optional(),
  incomeLastYear: lastYearIncomeSchema.optional(),
  endOfYear: endOfYearSchema.optional(),
  requirements: z
    .object({
      approveExternalData: z.string(),
    })
    .refine((schema) => schema.approveExternalData === YesOrNoEnum.YES, {
      params: requirements.inputs.required,
      path: ['approveExternalData'],
    }),
})

export type applicationSchema = z.infer<typeof applicationSchema>
export type BaseEntityType = z.infer<typeof baseEntitySchema>
