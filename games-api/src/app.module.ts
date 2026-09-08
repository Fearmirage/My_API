import { Module } from '@nestjs/common';
import { SalesController } from './sales/sales.controller.js';
import { SalesService } from './sales/sales.service.js';//.ts becomes .js locally when ran

@Module({
  controllers: [SalesController],
  providers: [SalesService],
})
export class AppModule {}
