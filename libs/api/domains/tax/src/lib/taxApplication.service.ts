import { TaxApplicationClientService } from '@island.is/clients/tax/application'
import { Inject, Injectable } from '@nestjs/common'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'
import { User } from '@island.is/auth-nest-tools'
import { OJOIAApplicationCaseResponse } from '../models/applicationCase.response'
import { PostApplicationInput } from '../models/postApplication.input'

const LOG_CATEGORY = 'tax-application'

@Injectable()
export class TaxApplicationService {
  constructor(
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
    private readonly taxApplicationService: TaxApplicationClientService,
  ) {}

  async getPrefilled(user: User) {
    return this.taxApplicationService.getPrefilled(user)
  }

  /*
  async postApplication(
    input: PostApplicationInput,
    user: User,
  ): Promise<boolean> {
    return this.taxApplicationService.postApplication(input, user)
  }
    */
}
