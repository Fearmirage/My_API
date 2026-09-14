import { Module } from '@nestjs/common';

import { SalesModule } from './sales/sales.module.js';
import { AuthModule } from './auth/auth.module.js';
import { RedisModule } from './redis/redis.module.js';

@Module({ imports: [
    SalesModule,
    AuthModule,
    RedisModule
], })

export class AppModule {}
