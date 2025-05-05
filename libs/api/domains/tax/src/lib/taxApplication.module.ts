import { Module } from '@nestjs/common'
import { TaxApplicationClientModule } from '@island.is/clients/tax/application'
import { TaxApplicationService } from './taxApplication.service'
import { TaxApplicationResolver } from './taxApplication.resolver'

@Module({
  imports: [TaxApplicationClientModule],
  providers: [TaxApplicationService, TaxApplicationResolver],
  exports: [TaxApplicationService],
})
export class TaxApplicationModule {}
