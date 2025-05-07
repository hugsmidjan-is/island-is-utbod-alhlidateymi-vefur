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
import { info } from 'kennitala'
import { TemplateApiError } from '@island.is/nest/problem'
import { coreErrorMessages } from '@island.is/application/core/messages'
import { logger } from '@island.is/logging'
import { groupIncomeLines } from './utils'

@Injectable()
export class TaxReturnStatusService extends BaseTemplateApiService {
  constructor(
    // private readonly sharedTemplateAPIService: SharedTemplateApiService,
    private readonly taxApplicationService: TaxApplicationClientService,
    private readonly taxNatRegService: TaxNationalRegistryClientService,
  ) {
    super(ApplicationTypes.TAX_RETURN)
  }

  // async submitApplication({ application, auth }: TemplateApiModuleActionProps) {
  //   const { paymentUrl } = application.externalData.createCharge.data as {
  //     paymentUrl: string
  //   }
  //   if (!paymentUrl) {
  //     return {
  //       success: false,
  //     }
  //   }

  //   const isPayment: { fulfilled: boolean } | undefined =
  //     await this.sharedTemplateAPIService.getPaymentStatus(auth, application.id)

  //   if (!isPayment?.fulfilled) {
  //     throw new Error(
  //       'Ekki er búið að staðfesta greiðslu, hinkraðu þar til greiðslan er staðfest.',
  //     )
  //   }

  //   const person = {
  //     ssn: application.applicant,
  //     signed: false,
  //     type: PersonType.CriminalRecordApplicant,
  //   }
  //   const persons = [person]

  //   const uploadDataName = 'Umsókn um sakavottorð frá Ísland.is'
  //   const uploadDataId = 'Sakavottord2.1'

  //   return await this.syslumennService
  //     .uploadDataCriminalRecord(
  //       auth,
  //       persons,
  //       undefined,
  //       {},
  //       uploadDataName,
  //       uploadDataId,
  //     )
  //     .catch(async (e) => {
  //       logger.error(e)
  //       return undefined
  //     })
  // }

  async getTaxReturnData({ auth }: TemplateApiModuleActionProps) {
    const res = await this.taxApplicationService.getPrefilled(auth)
    const groupedIncome = groupIncomeLines(res.prefill)
    return {
      groupedIncome,
      prefill: res.prefill,
    }
  }

  async getTaxNationalRegistryData({ auth }: TemplateApiModuleActionProps) {
    return await this.taxNatRegService.getUserInfo(auth)
  }
}
