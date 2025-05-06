import { Field, ObjectType, Int, Float } from '@nestjs/graphql'

@ObjectType('IncomeType')
export class IncomeType {
  @Field({ description: 'The ID of the income type' })
  id!: string

  @Field({ description: 'The code of the income type' })
  code!: string

  @Field({ description: 'The name of the income type' })
  name!: string
}

@ObjectType('IncomeLine')
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

@ObjectType('Income')
export class Income {
  @Field({ description: 'The ID of the income' })
  id!: string

  @Field({ description: 'The type of the income' })
  type!: string

  @Field(() => [IncomeLine], { description: 'The list of income lines' })
  incomeLines!: IncomeLine[]
}

@ObjectType('Prefill')
export class Prefill {
  @Field(() => Int, { description: 'The national ID of the user' })
  nationalId!: number

  @Field(() => Income, { description: 'The income details' })
  income!: Income
}

@ObjectType('PrefilledIncomeResponse')
export class PrefilledIncomeResponse {
  @Field(() => Prefill, { description: 'The prefill data' })
  prefill!: Prefill
}
