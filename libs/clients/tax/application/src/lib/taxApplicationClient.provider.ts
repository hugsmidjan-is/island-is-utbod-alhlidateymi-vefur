import { Provider } from '@nestjs/common'
import { Configuration, TaxReturnPublicAPIApi } from '../../gen/fetch'
import { createEnhancedFetch } from '@island.is/clients/middlewares'

export const TaxApplicationClientApiProvider: Provider<TaxReturnPublicAPIApi> =
  {
    provide: TaxReturnPublicAPIApi,
    useFactory: () => {
      return new TaxReturnPublicAPIApi(
        new Configuration({
          fetchApi: createEnhancedFetch({
            name: 'clients-tax-application',

            organizationSlug: 'skatturinn',
          }),
          basePath: `http://localhost:3000`,
        }),
      )
    },
  }
