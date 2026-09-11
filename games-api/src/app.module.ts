import { Module } from '@nestjs/common';

import { SalesModule } from './sales/sales.module.js';

@Module({ imports: [ SalesModule ], })

export class AppModule {}
