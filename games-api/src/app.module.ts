import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SalesModule } from './sales/sales.module.js';

@Module({
  imports: [SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
