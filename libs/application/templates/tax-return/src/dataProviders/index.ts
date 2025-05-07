import { defineTemplateApi } from '@island.is/application/types'

export const TaxReturnApi = defineTemplateApi({
  action: 'getTaxReturnData',
  externalDataId: 'getTaxReturnData',
})

export const TaxNationalRegistryApi = defineTemplateApi({
  action: 'getTaxNationalRegistryData',
  externalDataId: 'getTaxNationalRegistryData',
})
