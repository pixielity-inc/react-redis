import { useState } from 'react';
import { Button, Card, Chip } from '@heroui/react';
import { useRedis } from '@abdokouta/react-redis';

import { title, subtitle } from '@/components/primitives';
import { GithubIcon } from '@/components/icons';
import DefaultLayout from '@/layouts/default';

export default function IndexPage() {
  const redis = useRedis();

  const [result, setResult] = useState<string | null>(null);
  const [counter, setCounter] = useState<number | null>(null);

  const handleSet = async () => {
    const conn = await redis.connection();

    await conn.set('demo:greeting', `Hello from Redis at ${new Date().toLocaleTimeString()}`, {
      ex: 30,
    });
    const value = await conn.get('demo:greeting');

    setResult((value as string) ?? '(empty)');
  };

  const handleIncrement = async () => {
    const conn = await redis.connection();
    const value = await conn.incr('demo:counter');

    setCounter(value);
  };

  const handleFlush = async () => {
    const conn = await redis.connection();

    await conn.del('demo:greeting', 'demo:counter');
    setResult(null);
    setCounter(null);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Browser-Compatible&nbsp;</span>
          <span className={title({ color: 'blue' })}>Redis&nbsp;</span>
          <br />
          <span className={title()}>for React</span>
          <div className={subtitle({ class: 'mt-4' })}>
            Multiple connections, React hooks, and Upstash HTTP API
          </div>
        </div>

        <div className="flex gap-3">
          <Button size="lg" variant="primary" onPress={() => window.location.assign('/config')}>
            Configuration
          </Button>
          <Button
            size="lg"
            variant="outline"
            onPress={() => window.open('https://github.com/abdokouta/react-redis', '_blank')}
          >
            <GithubIcon size={20} />
            GitHub
          </Button>
        </div>

        <div className="mt-8 w-full max-w-2xl">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Try it out</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <Button size="sm" onPress={handleSet}>
                set() + get()
              </Button>
              <Button size="sm" variant="secondary" onPress={handleIncrement}>
                incr()
              </Button>
              <Button size="sm" variant="danger" onPress={handleFlush}>
                del()
              </Button>
            </div>

            {result && (
              <div className="p-3 bg-default-100 rounded text-sm mb-2">
                <span className="font-semibold">get(): </span>
                {result}
                <p className="text-xs text-default-400 mt-1 italic">Stored in Redis with 30s TTL</p>
              </div>
            )}

            {counter !== null && (
              <div className="p-3 bg-default-100 rounded text-sm">
                <span className="font-semibold">counter: </span>
                <Chip color="accent" size="sm" variant="soft">
                  <Chip.Label>{counter}</Chip.Label>
                </Chip>
              </div>
            )}
          </Card>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2 rounded-xl bg-surface shadow-surface px-4 py-2">
            <pre className="text-sm font-medium font-mono">
              pnpm add{' '}
              <code className="px-2 py-1 h-fit font-mono font-normal inline whitespace-nowrap rounded-sm bg-accent/20 text-accent text-sm">
                @abdokouta/react-redis @abdokouta/ts-container
              </code>
            </pre>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
