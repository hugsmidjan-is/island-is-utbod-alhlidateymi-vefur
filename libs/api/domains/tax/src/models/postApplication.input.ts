import { Field, InputType } from '@nestjs/graphql'

@InputType('TaxPostApplicationInput', {
  description: 'Submit application input',
})
export class PostApplicationInput {
  @Field()
  id!: string
}
