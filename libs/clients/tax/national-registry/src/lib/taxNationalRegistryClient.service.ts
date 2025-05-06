import { Inject, Injectable } from '@nestjs/common'
import { NationalRegistryApi } from '../../gen/fetch'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'
import { Auth, AuthMiddleware } from '@island.is/auth-nest-tools'

const LOG_CATEGORY = 'tax-national-registry-client-service'

@Injectable()
export class TaxNationalRegistryClientService {
  constructor(
    private readonly taxNationalRegistryApi: NationalRegistryApi,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  private taxNationalRegistryApiWithAuth(auth: Auth) {
    return this.taxNationalRegistryApi.withMiddleware(new AuthMiddleware(auth))
  }

  async getUserInfo(auth: Auth) {
    try {
      const data = await this.taxNationalRegistryApiWithAuth(
        auth,
      ).getPersonByNationalId({
        // nationalId: auth.nationalId ?? '1203894569',
        nationalId: '1203894569',
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
