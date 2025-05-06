import { Provider } from '@nestjs/common'
import { Configuration, NationalRegistryApi } from '../../gen/fetch'
import { createEnhancedFetch } from '@island.is/clients/middlewares'

export const TaxNationalRegistryClientApiProvider: Provider<NationalRegistryApi> =
  {
    provide: NationalRegistryApi,
    useFactory: () => {
      return new NationalRegistryApi(
        new Configuration({
          fetchApi: createEnhancedFetch({
            name: 'clients-tax-application',

            organizationSlug: 'thjodskra',
          }),
          basePath: `http://localhost:4000`,
        }),
      )
    },
  }
