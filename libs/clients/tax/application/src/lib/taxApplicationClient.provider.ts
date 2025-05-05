import { Provider } from '@nestjs/common'
import { Configuration, DefaultApi as TaxApplicationApi } from '../../gen/fetch'
import { createEnhancedFetch } from '@island.is/clients/middlewares'
import { TaxApplicationClientConfig } from './taxApplicationClient.config'
import { ConfigType } from '@nestjs/config'
import { IdsClientConfig, XRoadConfig } from '@island.is/nest/config'

export const TaxApplicationClientApiProvider: Provider<TaxApplicationApi> = {
  provide: TaxApplicationApi,
  useFactory: (
    xroadConfig: ConfigType<typeof XRoadConfig>,
    config: ConfigType<typeof TaxApplicationClientConfig>,
    idsClientConfig: ConfigType<typeof IdsClientConfig>,
  ) => {
    return new TaxApplicationApi(
      new Configuration({
        fetchApi: createEnhancedFetch({
          name: 'clients-tax-application',
          autoAuth: idsClientConfig.isConfigured
            ? {
                mode: 'tokenExchange',
                issuer: idsClientConfig.issuer,
                clientId: idsClientConfig.clientId,
                clientSecret: idsClientConfig.clientSecret,
                scope: config.scope,
              }
            : undefined,
          organizationSlug: 'skatturinn',
        }),
        basePath: `${xroadConfig.xRoadBasePath}/r1/${config.xRoadServicePath}`,
        headers: {
          'X-Road-Client': xroadConfig.xRoadClient,
          Accept: 'application/json',
        },
      }),
    )
  },
  inject: [
    XRoadConfig.KEY,
    TaxApplicationClientConfig.KEY,
    IdsClientConfig.KEY,
  ],
}
