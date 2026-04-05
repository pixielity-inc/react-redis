import { useState } from "react";
import { Button, Card, Chip, Separator } from "@heroui/react";
import { useRedis } from "@abdokouta/react-redis";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function AdvancedPage() {
  const redis = useRedis();

  // Basic ops state
  const [lastKey, setLastKey] = useState("");
  const [getValue, setGetValue] = useState<string | undefined>();
  const [existsResult, setExistsResult] = useState<boolean | null>(null);
  const [ttlResult, setTtlResult] = useState<number | null>(null);

  // Counter state
  const [counter, setCounter] = useState<number | null>(null);

  // Multi state
  const [manyResult, setManyResult] = useState<Record<string, unknown> | null>(
    null,
  );

  // Pipeline state
  const [pipelineResult, setPipelineResult] = useState<unknown[] | null>(null);

  // Connection names
  const connectionNames = redis.getConnectionNames();
  const defaultConnection = redis.getDefaultConnectionName();

  // --- Basic Operations ---
  const handleSet = async () => {
    const conn = await redis.connection();
    const key = `item:${Date.now()}`;

    await conn.set(key, `Created at ${new Date().toLocaleTimeString()}`, {
      ex: 60,
    });
    setLastKey(key);
    setGetValue(undefined);
    setExistsResult(null);
    setTtlResult(null);
  };

  const handleGet = async () => {
    if (!lastKey) return;
    const conn = await redis.connection();
    const value = await conn.get(lastKey);

    setGetValue((value as string) ?? "(not found)");
  };

  const handleExists = async () => {
    if (!lastKey) return;
    const conn = await redis.connection();
    const count = await conn.exists(lastKey);

    setExistsResult(count > 0);
  };

  const handleTtl = async () => {
    if (!lastKey) return;
    const conn = await redis.connection();
    const ttl = await conn.ttl(lastKey);

    setTtlResult(ttl);
  };

  const handleDel = async () => {
    if (!lastKey) return;
    const conn = await redis.connection();

    await conn.del(lastKey);
    setGetValue(undefined);
    setExistsResult(null);
    setTtlResult(null);
  };

  const handleFlush = async () => {
    const conn = await redis.connection();

    await conn.flushdb();
    setLastKey("");
    setGetValue(undefined);
    setExistsResult(null);
    setTtlResult(null);
    setCounter(null);
    setManyResult(null);
    setPipelineResult(null);
  };

  // --- Counters ---
  const handleIncr = async () => {
    const conn = await redis.connection();
    const value = await conn.incr("adv:counter");

    setCounter(value);
  };

  const handleDecr = async () => {
    const conn = await redis.connection();
    const value = await conn.decr("adv:counter");

    setCounter(value);
  };

  // --- Multi-key ---
  const handleMset = async () => {
    const conn = await redis.connection();

    await conn.mset({ "adv:a": "Alpha", "adv:b": "Bravo", "adv:c": "Charlie" });
    const values = await conn.mget("adv:a", "adv:b", "adv:c");

    setManyResult({
      "adv:a": values[0],
      "adv:b": values[1],
      "adv:c": values[2],
    });
  };

  // --- Pipeline ---
  const handlePipeline = async () => {
    const conn = await redis.connection();
    const pipeline = conn.pipeline();

    pipeline.set("pipe:x", "hello", { ex: 60 });
    pipeline.set("pipe:y", "world", { ex: 60 });
    pipeline.get("pipe:x");
    pipeline.get("pipe:y");
    const results = await pipeline.exec();

    setPipelineResult(results);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Advanced Redis Operations</span>
          <p className="text-default-500 mt-4">
            Interactive demo of every RedisService method
          </p>
        </div>

        <div className="w-full max-w-5xl space-y-8">
          {/* Connections */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Connections</h2>
            <div className="flex gap-2">
              {connectionNames.map((name) => (
                <Chip
                  key={name}
                  color={name === defaultConnection ? "accent" : "default"}
                  size="sm"
                  variant="soft"
                >
                  <Chip.Label>{name}</Chip.Label>
                </Chip>
              ))}
            </div>
            <p className="text-xs text-default-400">
              Default: {defaultConnection} — switch with
              redis.connection(&quot;name&quot;)
            </p>
          </div>

          <Separator />

          {/* Basic Operations */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              set / get / exists / ttl / del / flushdb
            </h2>
            <Card className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Button size="sm" onPress={handleSet}>
                  set()
                </Button>
                <Button
                  isDisabled={!lastKey}
                  size="sm"
                  variant="secondary"
                  onPress={handleGet}
                >
                  get()
                </Button>
                <Button
                  isDisabled={!lastKey}
                  size="sm"
                  variant="secondary"
                  onPress={handleExists}
                >
                  exists()
                </Button>
                <Button
                  isDisabled={!lastKey}
                  size="sm"
                  variant="secondary"
                  onPress={handleTtl}
                >
                  ttl()
                </Button>
                <Button
                  isDisabled={!lastKey}
                  size="sm"
                  variant="outline"
                  onPress={handleDel}
                >
                  del()
                </Button>
                <Button size="sm" variant="danger" onPress={handleFlush}>
                  flushdb()
                </Button>
              </div>

              {lastKey && (
                <div className="p-3 bg-default-100 rounded text-xs space-y-1">
                  <p>
                    <span className="font-semibold">key:</span> {lastKey}
                  </p>
                  {getValue !== undefined && (
                    <p>
                      <span className="font-semibold">get():</span> {getValue}
                    </p>
                  )}
                  {existsResult !== null && (
                    <p>
                      <span className="font-semibold">exists():</span>{" "}
                      {existsResult ? "true" : "false"}
                    </p>
                  )}
                  {ttlResult !== null && (
                    <p>
                      <span className="font-semibold">ttl():</span> {ttlResult}s
                    </p>
                  )}
                </div>
              )}
            </Card>
          </div>

          <Separator />

          {/* Counters */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">incr / decr</h2>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <Button size="sm" onPress={handleDecr}>
                  decr()
                </Button>
                <Chip color="accent" size="lg" variant="soft">
                  <Chip.Label>{counter ?? 0}</Chip.Label>
                </Chip>
                <Button size="sm" onPress={handleIncr}>
                  incr()
                </Button>
              </div>
            </Card>
          </div>

          <Separator />

          {/* Multi-key + Pipeline */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">mset / mget / pipeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3">mset / mget</h3>
                <p className="text-default-500 text-xs mb-3">
                  Bulk store and retrieve multiple keys
                </p>
                <Button size="sm" onPress={handleMset}>
                  Run
                </Button>
                {manyResult && (
                  <div className="mt-3 p-2 bg-default-100 rounded text-xs space-y-1">
                    {Object.entries(manyResult).map(([k, v]) => (
                      <p key={k}>
                        <span className="font-semibold">{k}:</span> {String(v)}
                      </p>
                    ))}
                  </div>
                )}
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-3">pipeline</h3>
                <p className="text-default-500 text-xs mb-3">
                  Batch multiple commands in one request
                </p>
                <Button size="sm" onPress={handlePipeline}>
                  Run
                </Button>
                {pipelineResult && (
                  <div className="mt-3 p-2 bg-default-100 rounded text-xs space-y-1">
                    {pipelineResult.map((r, i) => (
                      <p key={i}>
                        <span className="font-semibold">result[{i}]:</span>{" "}
                        {String(r)}
                      </p>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
