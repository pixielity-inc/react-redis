/**
 * Redis Configuration
 *
 * Defines named connections for the Redis module.
 * Connections are resolved at runtime using Upstash HTTP API.
 *
 * @module config/redis
 */

import { defineConfig } from '@abdokouta/react-redis';

const redisConfig = defineConfig({
  /** Register providers globally. */
  isGlobal: true,

  /** Default connection name. */
  default: import.meta.env.VITE_REDIS_DEFAULT_CONNECTION || 'main',

  connections: {
    /** Primary connection. */
    main: {
      url: import.meta.env.VITE_UPSTASH_REDIS_REST_URL || '',
      token: import.meta.env.VITE_UPSTASH_REDIS_REST_TOKEN || '',
    },

    /** Separate connection for session data. */
    session: {
      url:
        import.meta.env.VITE_UPSTASH_SESSION_REST_URL ||
        import.meta.env.VITE_UPSTASH_REDIS_REST_URL ||
        '',
      token:
        import.meta.env.VITE_UPSTASH_SESSION_REST_TOKEN ||
        import.meta.env.VITE_UPSTASH_REDIS_REST_TOKEN ||
        '',
    },
  },
});

export default redisConfig;
