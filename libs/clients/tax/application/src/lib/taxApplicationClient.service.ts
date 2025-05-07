import { Inject, Injectable } from '@nestjs/common'
import {
  GetPersonPrefillResponse,
  SubmitTaxReturnByNationalIdAndYearRequest,
  TaxReturnCreate,
  TaxReturnPublicAPIApi,
} from '../../gen/fetch'
import { LOGGER_PROVIDER } from '@island.is/logging'
import type { Logger } from '@island.is/logging'
import { Auth, AuthMiddleware } from '@island.is/auth-nest-tools'

const LOG_CATEGORY = 'tax-application-client-service'

@Injectable()
export class TaxApplicationClientService {
  constructor(
    private readonly taxApplicationApi: TaxReturnPublicAPIApi,

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
        // nationalId: auth.nationalId ?? '1203894569',
        nationalId: '1203894569',
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

  async submitTaxReturn(
    params: SubmitTaxReturnByNationalIdAndYearRequest,
    auth: Auth,
  ): Promise<TaxReturnCreate> {
    try {
      const res = await this.taxApplicationApiWithAuth(
        auth,
      ).submitTaxReturnByNationalIdAndYear(params)
      return Promise.resolve(res)
    } catch (error) {
      this.logger.warn('Failed to post application', {
        error,
        applicationId: params.nationalId,
        category: LOG_CATEGORY,
      })
      return Promise.reject(false)
    }
  }
  async getTaxReturnTypes(): Promise<GetPersonPrefillResponse> {
    try {
      const data = await this.taxApplicationApi.getTaxReturnTypes()
      return data
    } catch (error) {
      this.logger.warn('Failed to get tax return types', {
        error,
        category: LOG_CATEGORY,
      })
      throw error
    }
  }
}
