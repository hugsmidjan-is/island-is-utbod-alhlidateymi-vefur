import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('TaxApplicationCaseResponse')
export class OJOIAApplicationCaseResponse {
  @Field()
  department!: string

  @Field()
  type!: string

  @Field()
  status!: string

  @Field()
  communicationStatus!: string

  @Field(() => [String])
  categories!: string[]

  @Field()
  html!: string
}
