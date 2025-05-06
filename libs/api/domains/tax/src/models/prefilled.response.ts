import { Field, ObjectType, Int, Float } from '@nestjs/graphql'

@ObjectType('TaxApplicationDebtType')
export class DebtType {
  @Field({ description: 'The ID of the debt type' })
  id!: string

  @Field({ description: 'The name of the debt type' })
  name!: string
}

@ObjectType('TaxApplicationDebtLine')
export class DebtLine {
  @Field({ description: 'The ID of the debt line' })
  id!: string

  @Field(() => DebtType, { description: 'The type of debt' })
  debtType!: DebtType

  @Field({ description: 'The label of the debt line' })
  label!: string

  @Field(() => Float, { description: 'The outstanding principal amount' })
  outstandingPrincipal!: number

  @Field({ nullable: true, description: 'The origination date of the debt' })
  originationDate?: string

  @Field({ nullable: true, description: 'The identifier of the debt' })
  identifier?: string

  @Field({ nullable: true, description: 'The term of the debt in months' })
  term?: number

  @Field(() => Float, { description: 'The interest amount' })
  interestAmount!: number

  @Field({ nullable: true, description: 'The annual total payment' })
  annualTotalPayment?: number

  @Field({ nullable: true, description: 'The annual total principal payment' })
  annualTotalPrincipalPayment?: number

  @Field({ nullable: true, description: 'The creditor ID' })
  creditorId?: string

  @Field({ description: 'The currency of the debt' })
  currency!: string
}

@ObjectType('TaxApplicationDebt')
export class Debt {
  @Field({ description: 'The ID of the debt' })
  id!: string

  @Field({ description: 'The type of the debt' })
  type!: string

  @Field(() => [DebtLine], { description: 'The list of debt lines' })
  debtLines!: DebtLine[]
}

@ObjectType('TaxApplicationIncomeType')
export class IncomeType {
  @Field({ description: 'The ID of the income type' })
  id!: string

  @Field({ description: 'The code of the income type' })
  code!: string

  @Field({ description: 'The name of the income type' })
  name!: string
}

@ObjectType('TaxApplicationIncomeLine')
export class IncomeLine {
  @Field({ description: 'The ID of the income line' })
  id!: string

  @Field(() => IncomeType, { description: 'The type of income' })
  incomeType!: IncomeType

  @Field({ description: 'The label of the income line' })
  label!: string

  @Field(() => Float, { description: 'The value of the income line' })
  value!: number

  @Field({ nullable: true, description: 'The payer of the income line' })
  payer?: string
}

@ObjectType('TaxApplicationIncome')
export class Income {
  @Field({ description: 'The ID of the income' })
  id!: string

  @Field({ description: 'The type of the income' })
  type!: string

  @Field(() => [IncomeLine], { description: 'The list of income lines' })
  incomeLines!: IncomeLine[]
}

@ObjectType('TaxApplicationPropertyLine')
export class PropertyLine {
  @Field({ description: 'The ID of the property line' })
  id!: string

  @Field({ description: 'The label of the property line' })
  label!: string

  @Field({ description: 'The identifier of the property line' })
  identifier!: string

  @Field(() => Float, { description: 'The value of the property line' })
  value!: number

  @Field({ description: 'The currency of the property line' })
  currency!: string

  @Field({ description: 'The property ID associated with the property line' })
  propertyId!: string

  @Field({
    description: 'The property type ID associated with the property line',
  })
  propertyTypeId!: string
}

@ObjectType('TaxApplicationProperty')
export class Property {
  @Field({ description: 'The ID of the property' })
  id!: string

  @Field({ description: 'The type of the property' })
  type!: string

  @Field(() => [PropertyLine], { description: 'The list of property lines' })
  propertyLines!: PropertyLine[]
}

@ObjectType('TaxApplicationPrefill')
export class Prefill {
  @Field(() => Int, { description: 'The national ID of the user' })
  nationalId!: number

  @Field(() => Int, { description: 'The year of the prefill data' })
  year!: number

  @Field(() => Income, { description: 'The income details' })
  income!: Income

  @Field(() => Debt, { description: 'The debt details' })
  debt!: Debt

  @Field(() => Property, { description: 'The property details' })
  property!: Property
}

@ObjectType('TaxApplicationAddress')
export class Address {
  @Field({ description: 'The street address' })
  address!: string

  @Field({ description: 'The city of the address' })
  city!: string

  @Field({ description: 'The postal code of the address' })
  postalCode!: string

  @Field({ description: 'The country of the address' })
  country!: string
}

@ObjectType('TaxApplicationPerson')
export class Person {
  @Field({ description: 'Name of the person' })
  name!: string

  @Field({ description: 'National ID of the person' })
  nationalId!: string

  @Field({ nullable: true, description: 'Email address of the person' })
  email?: string

  @Field({ nullable: true, description: 'Phone number of the person' })
  phoneNumber?: string

  @Field(() => Address, {
    nullable: true,
    description: 'Address of the person',
  })
  address?: Address
}

@ObjectType('PrefilledIncomeResponse')
export class PrefilledIncomeResponse {
  @Field(() => Prefill, { description: 'The prefill data' })
  prefill!: Prefill

  @Field(() => Person, { nullable: true, description: 'Details of the person' })
  person?: Person
}
