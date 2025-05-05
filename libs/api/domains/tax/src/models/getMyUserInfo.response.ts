import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('OfficialJournalOfIcelandApplicationGetMyUserInfoResponse')
export class GetMyUserInfoResponse {
  @Field({ description: 'The first name of the user' })
  firstName!: string

  @Field({ description: 'The last name of the user' })
  lastName!: string

  @Field({ description: 'The email of the user' })
  email!: string
}
