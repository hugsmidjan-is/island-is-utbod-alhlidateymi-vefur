import { Module } from '@nestjs/common'
import { SharedTemplateAPIModule } from '../../shared'
import { TaxReturnStatusService } from './tax-return-status.service'
import { TaxApplicationClientModule } from '@island.is/clients/tax/application'
import { TaxNationalRegistryClientModule } from '@island.is/clients/tax/national-registry'

@Module({
  imports: [
    SharedTemplateAPIModule,
    TaxApplicationClientModule,
    TaxNationalRegistryClientModule,
  ],
  providers: [TaxReturnStatusService],
  exports: [TaxReturnStatusService],
})
export class TaxReturnStatusModule {}
