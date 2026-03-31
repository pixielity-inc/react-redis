/**
 * Refine Module Options Interface
 *
 * Configuration options for RefineModule.forRoot()
 *
 * Note: Resources are managed separately via RefineModule.forFeature()
 *
 * @module @abdokouta/refine
 */

import type { RefineConfig } from './refine-config.interface';

/**
 * Options for RefineModule.forRoot()
 *
 * Extends RefineConfig with DI-specific options.
 * Resources should be registered using RefineModule.forFeature() in feature modules.
 *
 * @example
 * ```typescript
 * RefineModule.forRoot({
 *   dataProvider: simpleRestDataProvider('https://api.example.com'),
 *   authProvider: myAuthProvider,
 *   isGlobal: true,
 * })
 * ```
 */
export interface RefineModuleOptions extends RefineConfig {
  /**
   * Whether the module should be global
   * If true, the module will be available throughout the application
   *
   * @default true
   */
  isGlobal?: boolean;
}
