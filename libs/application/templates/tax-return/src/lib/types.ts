import { Application, FieldBaseProps } from '@island.is/application/types'
import { Routes } from './constants'
import { applicationSchema } from './dataSchema'
import { TaxApplicationPerson } from '@island.is/api/schema'

export const InputFields = {
  [Routes.REQUIREMENTS]: {
    approveExternalData: 'requirements.approveExternalData',
  },
  [Routes.GENERAL_INFO]: {
    contact: {
      email: 'generalInfo.contact.email',
      phone: 'generalInfo.contact.phone',
    },
  },
  [Routes.INCOME_LAST_YEAR]: {
    salary: 'incomeLastYear.salary',
    benefits: 'incomeLastYear.benefits',
    compensation: 'incomeLastYear.compensation',
  },
  [Routes.END_OF_YEAR]: {
    property: 'endOfYear.property',
    vehicle: 'endOfYear.vehicle',
  },
  [Routes.INTEREST_CHARGES]: {
    propertyLoan: 'interestCharges.propertyLoan',
    general: 'interestCharges.general',
  },
}

export type IncomeType = {
  id: string
  name: string
}

export type IncomeLine = {
  id: string
  label: string
  value: number
  payer?: string
  identifier?: string
  incomeType: IncomeType
}

export type IncomeTypeCategory =
  | 'compensation'
  | 'salary'
  | 'benefits'
  | 'property'
  | 'vehicle'
  | 'unknown'

export type GroupedIncome = {
  name: string // from incomeType.name
  type: IncomeTypeCategory
  items: IncomeLine[]
}

export enum TemplateApiActions {
  departments = 'getDepartments',
  types = 'getAdvertTypes',
  postApplication = 'postApplication',
}

export type NestedType<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? NestedType<T[K]>
    : string
}

export type Override<T1, T2> = Omit<T1, keyof T2> & T2

export type ErrorSchema = NestedType<applicationSchema>

export enum TaxReturnDebtTypeEnum {
  Prefill = 'prefill',
  Submit = 'submit',
}

export interface TaxReturnDebtType {
  id: string
  name: string
}

export interface TaxReturnDebtLine {
  id: string
  debtType: TaxReturnDebtType
  label: string
  originationDate: Date
  identifier: string
  term: number
  outstandingPrincipal: number
  interestAmount: number
  annualTotalPayment: number
  annualTotalPrincipalPayment: number
  creditorId: string
  currency: string
  creditorName: string
  writeDown: number
  costOfLoan?: number
  ratio?: number
}
export interface TaxReturnDebt {
  id: string
  type: TaxReturnDebtTypeEnum
  debtLines: Array<TaxReturnDebtLine>
}

export interface PersonPrefill {
  nationalId: string
  year: number
  income: any
  debt: TaxReturnDebt
  property: any
}

// export type TaxReturnDataTypes = {
//   groupedIncome: GroupedIncome[];
//   groupedDebt: GroupedDebt[];
// }

export type TaxApplication = Override<
  Application,
  {
    answers: applicationSchema
    externalData: {
      postApplication?: {
        data: {
          id: string
          timestamp: string
        }
      }
      getTaxNationalRegistryData: {
        data: {
          person: TaxApplicationPerson
        }
      }
      getTaxReturnData: {
        data: {
          groupedIncome: GroupedIncome[]
          groupedProperty: GroupedIncome[]
          prefill: PersonPrefill
        }
      }
    }
  }
>

export type TaxFieldBaseProps = Override<
  FieldBaseProps,
  {
    application: TaxApplication
    errors: ErrorSchema
  }
>
