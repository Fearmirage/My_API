import { Module } from '@nestjs/common';

import { SalesModule } from './sales/sales.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({ imports: [ SalesModule, AuthModule, ], })

export class AppModule {}
