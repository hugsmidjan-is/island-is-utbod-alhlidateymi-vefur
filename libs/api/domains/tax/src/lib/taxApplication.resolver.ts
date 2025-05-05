import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
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
import { GetMyUserInfoResponse } from '../models/getMyUserInfo.response'
import { OJOIAIdInput } from '../models/id.input'
import { OJOIAApplicationCaseResponse } from '../models/applicationCase.response'

@Scopes(ApiScope.internal)
@UseGuards(IdsUserGuard, ScopesGuard)
@Resolver()
export class TaxApplicationResolver {
  constructor(private readonly taxApplicationService: TaxApplicationService) {}

  @Query(() => GetMyUserInfoResponse, {
    name: 'TaxApplicationGetMyUserInfo',
  })
  getMyUserInfo(@CurrentUser() user: User) {
    return this.taxApplicationService.getMyUserInfo(user)
  }

  @Query(() => OJOIAApplicationCaseResponse, {
    name: 'OJOIAGetApplicationCase',
  })
  getApplicationCase(
    @Args('input') input: OJOIAIdInput,
    @CurrentUser() user: User,
  ) {
    return this.taxApplicationService.getApplicationCase(input.id, user)
  }

  @Mutation(() => Boolean, {
    name: 'OJOIAPostApplication',
  })
  postApplication(
    @Args('input') input: OJOIAIdInput,
    @CurrentUser() user: User,
  ) {
    return this.taxApplicationService.postApplication(input, user)
  }
}
