import { Query, Resolver } from '@nestjs/graphql'
import {
  CurrentUser,
  IdsUserGuard,
  Scopes,
  ScopesGuard,
} from '@island.is/auth-nest-tools'
import { ApiScope } from '@island.is/auth/scopes'
import { TaxApplicationService } from './taxApplication.service'
import { UseGuards } from '@nestjs/common'
import type { User } from '@island.is/auth-nest-tools'
import { PrefilledIncomeResponse } from '../models/prefilled.response'

@Scopes(ApiScope.internal)
@UseGuards(IdsUserGuard, ScopesGuard)
@Resolver()
export class TaxApplicationResolver {
  constructor(private readonly taxApplicationService: TaxApplicationService) {}

  @Query(() => PrefilledIncomeResponse, {
    name: 'TaxApplicationGetPrefilled',
  })
  getPrefilled(@CurrentUser() user: User) {
    return this.taxApplicationService.getPrefilled(user)
  }

  /*@Mutation(() => Boolean, {
    name: 'OJOIAPostApplication',
  })
  postApplication(
    @Args('input') input: OJOIAIdInput,
    @CurrentUser() user: User,
  ) {
    return this.taxApplicationService.postApplication(input, user)
  }*/
}
