import { z } from 'zod'
import { requirements } from './messages'
import { YesOrNoEnum } from '@island.is/application/core'
import { errorMessages } from '../lib/messages'
import { isEmail } from 'class-validator'
export const baseEntitySchema = z.object({
  title: z.string(),
  value: z.string(),
  details: z.string().optional(),
})

const generalInfoSchema = z.object({
  contact: z.object({
    email: z.string().refine((val) => isEmail(val), {
      params: errorMessages.email,
    }),
    phone: z.string().refine(
      (val) => {
        return val.length >= 11
      },
      {
        params: errorMessages.phone,
      },
    ),
  }),
})

const lastYearIncomeSchema = z
  .object({
    salary: z.array(baseEntitySchema).optional(),
    benefits: z.array(baseEntitySchema).optional(),
    compensation: z.array(baseEntitySchema).optional(),
  })
  .partial()

const endOfYearSchema = z
  .object({
    property: z.array(baseEntitySchema).optional(),
    vehicle: z.array(baseEntitySchema).optional(),
  })
  .partial()

const propertyLoanSchema = z
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
    writeDown: z.string().optional(),
    takeoverDate: z.string().optional(),
    outstandingPrincipal: z.string().optional(),
    costOfLoan: z.string().optional(),
  })
  .partial()

const interestChargesSchema = z
  .object({
    propertyLoan: z.array(propertyLoanSchema).optional(),
    general: z.array(baseEntitySchema).optional(),
  })
  .partial()

export const applicationSchema = z.object({
  generalInfo: generalInfoSchema,
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
