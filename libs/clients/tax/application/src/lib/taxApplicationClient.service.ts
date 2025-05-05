import { Inject, Injectable } from '@nestjs/common'
import {
  DefaultApi as TaxApplicationApi,
  PostApplicationRequest,
  GetApplicationCaseRequest,
  GetApplicationCaseResponse,
} from '../../gen/fetch'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'
import { Auth, AuthMiddleware } from '@island.is/auth-nest-tools'

const LOG_CATEGORY = 'tax-application-client-service'

@Injectable()
export class TaxApplicationClientService {
  constructor(
    private readonly taxApplicationApi: TaxApplicationApi,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  private taxApplicationApiWithAuth(auth: Auth) {
    return this.taxApplicationApi.withMiddleware(new AuthMiddleware(auth))
  }

  async getMyUserInfo(auth: Auth) {
    try {
      const data = await this.taxApplicationApiWithAuth(auth).getMyUserInfo()
      return data
    } catch (error) {
      this.logger.warn('Failed to get my user info', {
        error,
        category: LOG_CATEGORY,
      })
      throw error
    }
  }

  async getApplicationCase(
    params: GetApplicationCaseRequest,
    auth: Auth,
  ): Promise<GetApplicationCaseResponse> {
    try {
      return await this.taxApplicationApiWithAuth(auth).getApplicationCase(
        params,
      )
    } catch (error) {
      this.logger.warn('Failed to get application case', {
        error,
        applicationId: params.id,
        category: LOG_CATEGORY,
      })

      throw error
    }
  }

  async postApplication(
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
  }
}
