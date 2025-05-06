import { Inject, Injectable } from '@nestjs/common'
import { TaxReturnApi } from '../../gen/fetch'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'
import { Auth, AuthMiddleware } from '@island.is/auth-nest-tools'

const LOG_CATEGORY = 'tax-application-client-service'

@Injectable()
export class TaxApplicationClientService {
  constructor(
    private readonly taxApplicationApi: TaxReturnApi,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  private taxApplicationApiWithAuth(auth: Auth) {
    return this.taxApplicationApi.withMiddleware(new AuthMiddleware(auth))
  }

  async getPrefilled(auth: Auth) {
    try {
      const data = await this.taxApplicationApiWithAuth(
        auth,
      ).getTaxReturnPrefillByNationalIdAndYear({
        nationalId: auth.nationalId ?? '1203894569',
        year: new Date().getFullYear().toString(),
      })
      return data
    } catch (error) {
      this.logger.warn('Failed to get prefilled', {
        error,
        category: LOG_CATEGORY,
      })
      throw error
    }
  }

  /*async postApplication(
    params: PostApplicationRequest,
    auth: Auth,
  ): Promise<boolean> {
    try {
      await this.taxApplicationApiWithAuth(auth).postApplication(params)
      return Promise.resolve(true)
    } catch (error) {
      this.logger.warn('Failed to post application', {
        error,
        applicationId: params.id,
        category: LOG_CATEGORY,
      })
      return Promise.reject(false)
    }
  }*/
}
