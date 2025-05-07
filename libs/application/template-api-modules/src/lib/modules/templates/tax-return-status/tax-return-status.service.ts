import { Injectable } from '@nestjs/common'
import { SharedTemplateApiService } from '../../shared'
import { TemplateApiModuleActionProps } from '../../../types'
import { TaxApplicationClientService } from '@island.is/clients/tax/application'
import { TaxNationalRegistryClientService } from '@island.is/clients/tax/national-registry'
import {
  ApplicationTypes,
  ApplicationWithAttachments as Application,
} from '@island.is/application/types'
import { BaseTemplateApiService } from '../../base-template-api.service'
import { logger } from '@island.is/logging'
import { groupHomeDebt, groupIncomeLines, groupPropertyLines } from './utils'
import { createTaxReturn, groupHomeDebt, groupIncomeLines, groupPropertyLines } from './utils'

@Injectable()
export class TaxReturnStatusService extends BaseTemplateApiService {
  constructor(
    // private readonly sharedTemplateAPIService: SharedTemplateApiService,
    private readonly taxApplicationService: TaxApplicationClientService,
    private readonly taxNatRegService: TaxNationalRegistryClientService,
  ) {
    super(ApplicationTypes.TAX_RETURN)
  }

  async postApplication({ application, auth }: TemplateApiModuleActionProps) {
    const taxReturn = createTaxReturn(application)

    return await this.taxApplicationService
      .submitTaxReturn(taxReturn, auth)
      .catch(async (e) => {
        logger.error(e)
        return undefined
      })
  }

  async getTaxReturnData({ auth }: TemplateApiModuleActionProps) {
    const res = await this.taxApplicationService.getPrefilled(auth)
    const groupedIncome = groupIncomeLines(res.prefill)
    const groupedProperty = groupPropertyLines(res.prefill)
    const groupedHomeDebt = groupHomeDebt(res.prefill)
    const groupedGeneralDebt = groupPropertyLines(res.prefill)
    return {
      groupedIncome,
      groupedProperty,
      groupedHomeDebt,
      prefill: res.prefill,
    }
  }

  async getTaxNationalRegistryData({ auth }: TemplateApiModuleActionProps) {
    return await this.taxNatRegService.getUserInfo(auth)
  }
}
