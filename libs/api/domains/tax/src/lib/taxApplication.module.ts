import { Module } from '@nestjs/common'
import { TaxApplicationClientModule } from '@island.is/clients/tax/application'
import { TaxNationalRegistryClientModule } from '@island.is/clients/tax/national-registry'
import { TaxApplicationService } from './taxApplication.service'
import { TaxApplicationResolver } from './taxApplication.resolver'

@Module({
  imports: [TaxApplicationClientModule, TaxNationalRegistryClientModule],
  providers: [TaxApplicationService, TaxApplicationResolver],
  exports: [TaxApplicationService],
})
export class TaxApplicationModule {}
