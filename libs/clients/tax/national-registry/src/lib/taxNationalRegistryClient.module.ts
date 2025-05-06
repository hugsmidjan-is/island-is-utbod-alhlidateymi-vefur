import { Module } from '@nestjs/common'
import { TaxNationalRegistryClientService } from './taxNationalRegistryClient.service'
import { TaxNationalRegistryClientApiProvider } from './taxNationalRegistryClient.provider'

@Module({
  providers: [
    TaxNationalRegistryClientApiProvider,
    TaxNationalRegistryClientService,
  ],
  exports: [TaxNationalRegistryClientService],
})
export class TaxNationalRegistryClientModule {}
