# Redis Integration Patterns

This document describes the patterns demonstrated in this example.

## 1. Module Setup

### RedisModule.forRoot

Configure the Redis module at the root level with your Upstash connections:

```typescript
// modules/app.module.ts
import { Module } from "@abdokouta/react-di";
import { RedisModule } from "@abdokouta/react-redis";
import redisConfig from "@/config/redis.config";

@Module({
  imports: [RedisModule.forRoot(redisConfig)],
})
export class AppModule {}
```

## 2. Configuration

Use `defineConfig()` for type-safe connection configuration:

```typescript
// config/redis.config.ts
import { defineConfig } from "@abdokouta/react-redis";

export default defineConfig({
  default: "main",
  connections: {
    main: {
      url: import.meta.env.VITE_UPSTASH_REDIS_REST_URL,
      token: import.meta.env.VITE_UPSTASH_REDIS_REST_TOKEN,
    },
    session: {
      url: import.meta.env.VITE_UPSTASH_SESSION_REST_URL,
      token: import.meta.env.VITE_UPSTASH_SESSION_REST_TOKEN,
    },
  },
});
```

## 3. React Hooks

### useRedis

Access the `RedisService` via DI:

```typescript
import { useRedis } from "@abdokouta/react-redis";

function MyComponent() {
  const redis = useRedis();

  const handleSave = async () => {
    const conn = await redis.connection();
    await conn.set("key", "value", { ex: 3600 });
  };
}
```

### useRedisConnection

Directly get a named connection:

```typescript
import { useRedisConnection } from "@abdokouta/react-redis";

function SessionComponent() {
  const connPromise = useRedisConnection("session");

  const saveSession = async () => {
    const conn = await connPromise;
    await conn.set("session:id", data, { ex: 86400 });
  };
}
```

## 4. Redis Operations

### Basic key-value

```typescript
const conn = await redis.connection();

await conn.set("key", "value", { ex: 60 }); // set with TTL
const val = await conn.get("key");           // get
await conn.del("key");                       // delete
const count = await conn.exists("key");      // exists check
const ttl = await conn.ttl("key");           // remaining TTL
```

### Counters

```typescript
await conn.incr("counter");   // increment by 1
await conn.decr("counter");   // decrement by 1
await conn.incrby("counter", 5); // increment by N
```

### Bulk operations

```typescript
await conn.mset({ "a": "Alpha", "b": "Bravo" });
const [a, b] = await conn.mget("a", "b");
```

### Pipeline (batch)

```typescript
const pipeline = conn.pipeline();
pipeline.set("x", "hello", { ex: 60 });
pipeline.set("y", "world", { ex: 60 });
pipeline.get("x");
pipeline.get("y");
const results = await pipeline.exec();
```

## 5. Multiple Connections

```typescript
const mainConn = await redis.connection();          // default
const sessionConn = await redis.connection("session"); // named

// Check active connections
redis.getConnectionNames();        // ['main', 'session']
redis.getDefaultConnectionName();  // 'main'
redis.isConnectionActive("main");  // true/false
```

## Running the Example

```bash
cp .env.example .env   # fill in Upstash credentials
pnpm install
pnpm dev
```

Navigate to:
- `http://localhost:5173/` — Basic Redis demo
- `http://localhost:5173/config` — Configuration guide
- `http://localhost:5173/advanced` — Advanced operations
