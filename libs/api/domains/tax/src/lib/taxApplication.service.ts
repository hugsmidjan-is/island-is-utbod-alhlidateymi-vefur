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

  async getMyUserInfo(user: User) {
    return this.taxApplicationService.getMyUserInfo(user)
  }

  async getApplicationCase(
    id: string,
    user: User,
  ): Promise<OJOIAApplicationCaseResponse> {
    const { applicationCase } =
      await this.taxApplicationService.getApplicationCase(
        {
          id,
        },
        user,
      )

    let title = 'Óþekkt'

    if ('title' in applicationCase.status) {
      title = applicationCase.status.title as string
    }

    const mapped: OJOIAApplicationCaseResponse = {
      department: applicationCase.department.title,
      type: applicationCase.type.title,
      categories: applicationCase.categories.map((c) => c.title),
      html: applicationCase.html,
      status: title,
      communicationStatus: applicationCase.communicationStatus.title,
    }

    return mapped
  }

  async postApplication(
    input: PostApplicationInput,
    user: User,
  ): Promise<boolean> {
    return this.taxApplicationService.postApplication(input, user)
  }
}
