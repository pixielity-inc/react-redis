/**
 * Define Config Utility
 *
 * Helper function to define Refine configuration with type safety.
 *
 * @module @abdokouta/refine
 */

import type { RefineConfig } from '../interfaces/refine-config.interface';

/**
 * Helper function to define Refine configuration with type safety
 *
 * Provides IDE autocomplete and type checking for configuration objects.
 * This pattern is consistent with modern tooling (Vite, Vitest, etc.).
 *
 * @param config - The Refine configuration object
 * @returns The same configuration object with proper typing
 *
 * @example
 * ```typescript
 * // refine.config.ts
 * import { defineConfig } from '@abdokouta/refine';
 * import { simpleRestDataProvider } from '@refinedev/simple-rest';
 *
 * export default defineConfig({
 *   dataProvider: simpleRestDataProvider('https://api.example.com'),
 *   options: {
 *     mutationMode: 'optimistic',
 *   },
 * });
 * ```
 */
export function defineConfig(config: RefineConfig): RefineConfig {
  return config;
}
