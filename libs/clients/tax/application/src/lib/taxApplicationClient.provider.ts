import { Provider } from '@nestjs/common'
import { Configuration, TaxReturnApi } from '../../gen/fetch'
import { createEnhancedFetch } from '@island.is/clients/middlewares'

export const TaxApplicationClientApiProvider: Provider<TaxReturnApi> = {
  provide: TaxReturnApi,
  useFactory: () => {
    return new TaxReturnApi(
      new Configuration({
        fetchApi: createEnhancedFetch({
          name: 'clients-tax-application',

          organizationSlug: 'skatturinn',
        }),
        basePath: `http://localhost:3000/api/v1`,
      }),
    )
  },
}
