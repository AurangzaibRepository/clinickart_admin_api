import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async get<T>(key: string): Promise<T | undefined> {
    return await this.cacheManager.get<T>(key);
  }

  async save<T>(key: string, value: T, ttl = 60): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async delete(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async testConnection(): Promise<string> {
    await this.cacheManager.set('connection:test', 'Redis is working');
  
    const value = await this.cacheManager.get<string>('connection:test');
  
    return value ?? 'NOT FOUND';
  }
}
