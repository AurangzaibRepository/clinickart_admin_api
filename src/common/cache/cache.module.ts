import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { CacheService } from './cache.service';

@Module({
  imports: [
    NestCacheModule.register({
      stores: [createKeyv(process.env.REDIS_URL)],
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
