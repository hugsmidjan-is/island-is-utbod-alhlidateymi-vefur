import { defineTemplateApi } from '@island.is/application/types'

export const TaxReturnApi = defineTemplateApi({
  action: 'getTestTaxData',
  externalDataId: 'getTestTaxData',
})

export const TaxNationalRegistryApi = defineTemplateApi({
  action: 'getTaxNationalRegistryData',
  externalDataId: 'getTaxNationalRegistryData',
})
