import { Module } from '@nestjs/common'
import { SharedTemplateAPIModule } from '../../shared'
import { TaxReturnStatusService } from './tax-return-status.service'
import { TaxApplicationClientModule } from '@island.is/clients/tax/application'

@Module({
  imports: [SharedTemplateAPIModule, TaxApplicationClientModule],
  providers: [TaxReturnStatusService],
  exports: [TaxReturnStatusService],
})
export class TaxReturnStatusModule {}
