import { Module } from '@abdokouta/ts-container';
import { RedisModule } from '@abdokouta/react-redis';

import redisConfig from '@/config/redis.config';

@Module({
  imports: [RedisModule.forRoot(redisConfig)],
  providers: [],
  exports: [],
})
export class AppModule {}
