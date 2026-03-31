/**
 * Redis Configuration
 *
 * Configuration for the @abdokouta/redis package.
 * Provides client-side Redis connection management using Upstash HTTP API.
 *
 * @module config/redis
 *
 * @example
 * ```typescript
 * import { redisConfig } from '@/config/redis.config';
 *
 * @Module({
 *   imports: [RedisModule.forRoot(redisConfig)],
 * })
 * export class AppModule {}
 * ```
 */

import { defineConfig } from '@abdokouta/redis';

/**
 * Redis configuration
 *
 * Configures Upstash Redis connections for browser-compatible caching.
 *
 * Environment Variables:
 * - VITE_REDIS_URL: Upstash Redis REST URL
 * - VITE_REDIS_TOKEN: Upstash Redis REST token
 * - VITE_REDIS_DEFAULT_CONNECTION: Default connection name (default: 'main')
 */
export const redisConfig = defineConfig({
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | The default Redis connection to use when no connection name is specified.
  |
  */
  default: 'main',

  /*
  |--------------------------------------------------------------------------
  | Redis Connections
  |--------------------------------------------------------------------------
  |
  | Configure multiple Redis connections. Each connection uses the Upstash
  | HTTP REST API for browser compatibility.
  |
  | To get your Upstash credentials:
  | 1. Sign up at https://upstash.com
  | 2. Create a Redis database
  | 3. Copy the REST URL and token from the dashboard
  |
  */
  connections: {
    main: {
      url: import.meta.env.VITE_REDIS_URL || '',
      token: import.meta.env.VITE_REDIS_TOKEN || '',
    },

    // Example: Separate connection for sessions
    // session: {
    //   url: import.meta.env.VITE_REDIS_SESSION_URL || '',
    //   token: import.meta.env.VITE_REDIS_SESSION_TOKEN || '',
    // },

    // Example: Separate connection for cache
    // cache: {
    //   url: import.meta.env.VITE_REDIS_CACHE_URL || '',
    //   token: import.meta.env.VITE_REDIS_CACHE_TOKEN || '',
    // },
  },
});
