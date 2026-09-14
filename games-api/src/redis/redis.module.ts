import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service.js';

@Global() // being an infrastructure service, Redis can be useful anywhere, therefore make it global.
@Module({
    providers: [RedisService],
    exports: [RedisService],
})
export class RedisModule {}