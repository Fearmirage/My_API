import { Module } from '@nestjs/common';
import { SalesController } from './sales/sales.controller.js';
import { SalesService } from './sales/sales.service.js';
import { SalesModule } from './sales/sales.module.js'; //.ts becomes .js locally when ran

@Module({
  imports: [SalesModule],
  controllers: [SalesController],
  providers: [SalesService],
})
export class AppModule {}
