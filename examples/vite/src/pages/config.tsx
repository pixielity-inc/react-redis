import { Card, Chip, Separator } from "@heroui/react";
import { useRedis } from "@abdokouta/react-redis";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function ConfigPage() {
  const redis = useRedis();

  const defaultConnection = redis.getDefaultConnectionName();
  const connectionNames = redis.getConnectionNames();

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Configuration</span>
          <p className="text-default-500 mt-4">
            How to set up @abdokouta/react-redis in your project
          </p>
        </div>

        <div className="w-full max-w-4xl space-y-8">
          {/* Active Config */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Active Configuration</h2>
            <Card className="p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold w-40">
                    Default Connection:
                  </span>
                  <Chip color="accent" size="sm" variant="soft">
                    <Chip.Label>{defaultConnection}</Chip.Label>
                  </Chip>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold w-40">
                    Connections:
                  </span>
                  <div className="flex gap-1">
                    {connectionNames.map((name) => (
                      <Chip
                        key={name}
                        color={
                          name === defaultConnection ? "success" : "default"
                        }
                        size="sm"
                        variant="soft"
                      >
                        <Chip.Label>{name}</Chip.Label>
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Separator />

          {/* defineConfig */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">1. Define Config</h2>
            <p className="text-default-500 text-sm">
              Create a type-safe configuration file using defineConfig()
            </p>
            <Card className="p-6">
              <pre className="text-sm font-mono overflow-x-auto whitespace-pre">
                {`// config/redis.config.ts
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
});`}
              </pre>
            </Card>
          </div>

          <Separator />

          {/* Module Setup */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">2. Register Module</h2>
            <p className="text-default-500 text-sm">
              Import RedisModule.forRoot() in your root module
            </p>
            <Card className="p-6">
              <pre className="text-sm font-mono overflow-x-auto whitespace-pre">
                {`// modules/app.module.ts
import { Module } from "@abdokouta/ts-container";
import { RedisModule } from "@abdokouta/react-redis";
import redisConfig from "@/config/redis.config";

@Module({
  imports: [
    RedisModule.forRoot(redisConfig),
  ],
})
export class AppModule {}`}
              </pre>
            </Card>
          </div>

          <Separator />

          {/* Usage */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">3. Use in Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3">Via Hook</h3>
                <pre className="text-sm font-mono overflow-x-auto whitespace-pre">
                  {`import { useRedis } from "@abdokouta/react-redis";

const redis = useRedis();
const conn = await redis.connection();

await conn.set("key", "value", { ex: 3600 });
const val = await conn.get("key");`}
                </pre>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3">Named Connection</h3>
                <pre className="text-sm font-mono overflow-x-auto whitespace-pre">
                  {`import { useRedisConnection } from "@abdokouta/react-redis";

const connPromise = useRedisConnection("session");
const conn = await connPromise;

await conn.set("session:id", data, { ex: 86400 });`}
                </pre>
              </Card>
            </div>
          </div>

          <Separator />

          {/* Env vars */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Environment Variables</h2>
            <Card className="p-4">
              <pre className="text-sm font-mono overflow-x-auto whitespace-pre">
                {`# .env
VITE_UPSTASH_REDIS_REST_URL="https://your-redis.upstash.io"
VITE_UPSTASH_REDIS_REST_TOKEN="your-token"

# Optional: separate session connection
VITE_UPSTASH_SESSION_REST_URL="https://your-session-redis.upstash.io"
VITE_UPSTASH_SESSION_REST_TOKEN="your-session-token"`}
              </pre>
            </Card>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
