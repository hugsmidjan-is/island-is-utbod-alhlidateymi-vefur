import { Module } from '@nestjs/common'
import { TaxApplicationClientService } from './taxApplicationClient.service'
import { TaxApplicationClientApiProvider } from './taxApplicationClient.provider'

@Module({
  providers: [TaxApplicationClientApiProvider, TaxApplicationClientService],
  exports: [TaxApplicationClientService],
})
export class TaxApplicationClientModule {}
