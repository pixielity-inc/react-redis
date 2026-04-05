# React Redis Example

This example demonstrates `@abdokouta/react-redis` — a browser-compatible Redis client using the Upstash HTTP API — integrated with `@abdokouta/react-di`.

## Features Demonstrated

### Home (`/`)
- `set()` with TTL
- `get()`
- `incr()`
- `del()`

### Configuration (`/config`)
- Active connection info
- Setup guide with code snippets
- Environment variable reference

### Advanced (`/advanced`)
- `set / get / exists / ttl / del / flushdb`
- `incr / decr` counters
- `mset / mget` bulk operations
- `pipeline` batched commands
- Multiple named connections

## Project Structure

```
src/
├── config/
│   ├── redis.config.ts     # Redis connections config
│   ├── container.config.ts # DI container config
│   └── site.ts             # Site navigation & links
├── modules/
│   └── app.module.ts       # Root DI module
├── pages/
│   ├── index.tsx           # Home page
│   ├── config.tsx          # Configuration page
│   └── advanced.tsx        # Advanced operations demo
├── components/             # UI components
├── layouts/                # Layout wrappers
├── provider.tsx            # DI container provider
└── main.tsx                # Entry point
```

## Setup

```bash
# Copy env file and fill in your Upstash credentials
cp .env.example .env

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Get your Upstash credentials at [console.upstash.com](https://console.upstash.com).

## Learn More

- [Main Documentation](../../README.md)
- [Upstash Redis](https://upstash.com/docs/redis)
