import { TaxApplicationClientService } from '@island.is/clients/tax/application'
import { Inject, Injectable } from '@nestjs/common'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'
import { User } from '@island.is/auth-nest-tools'
import { TaxNationalRegistryClientService } from '@island.is/clients/tax/national-registry'

const LOG_CATEGORY = 'tax-application'

@Injectable()
export class TaxApplicationService {
  constructor(
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
    private readonly taxApplicationService: TaxApplicationClientService,
    private readonly taxNationalRegistryClientService: TaxNationalRegistryClientService,
  ) {}

  async getPrefilled(user: User) {
    const prefilled = await this.taxApplicationService.getPrefilled(user)
    const userInfo = await this.taxNationalRegistryClientService.getUserInfo(
      user,
    )
    return { prefilled, userInfo }
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
