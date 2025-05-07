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

const propertyLoan = z
  .object({
    address: z.string().optional(),
    buyYear: z.string().optional(),
    loanNr: z.string().optional(),
    creditorName: z.string().optional(),
    creditorId: z.string().optional(),
    originationDate: z.string().optional(),
    term: z.string().optional(),
    annualTotalPayment: z.string().optional(),
    annualTotalPrincipalPayment: z.string().optional(),
    interestAmount: z.string().optional(),
    outstandingPrincipal: z.string().optional(),
  })
  .partial()

const interestChargesSchema = z
  .object({
    housing: z.array(baseEntitySchema).optional(),
    vehicles: z.array(baseEntitySchema).optional(),
  })
  .partial()

export const applicationSchema = z.object({
  generalInfo: generalInfoSchema.optional(),
  incomeLastYear: lastYearIncomeSchema.optional(),
  endOfYear: endOfYearSchema.optional(),
  interestCharges: interestChargesSchema.optional(),
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
