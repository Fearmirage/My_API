import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
    private readonly redis = new Redis({//"private readonly" prevents other script to directly access redis
                                        // so that they can use our cleaner methods below.
        host: 'localhost', // to be changed when the server is not hosted locally
        port: 6379,
    });

    //"async" allows the other scripts to "await" this one to make proper communication between them.
    async get(key: string) {
        return this.redis.get(key);
    }

    async set(key: string, value: string, ttlSeconds?: number) {
        if (ttlSeconds) {
            return this.redis.set(key, value, 'EX', ttlSeconds); // EX means expiration time in seconds
        }
        return this.redis.set(key, value); // no expiration time, it is permanent
    }

    async del(key: string) {
        return this.redis.del(key);
    }

    async flushAll() {
        return this.redis.flushall()
    }

    async onModuleDestroy() {
        await this.redis.quit(); // quits redis when NestJS shuts down
    }
}