/**
 * Refine Module Async Options Interface
 *
 * Configuration options for RefineModule.forRootAsync()
 *
 * Note: Resources are managed separately via RefineModule.forFeature()
 *
 * @module @abdokouta/refine
 */

import type { RefineModuleOptions } from './refine-module-options.interface';

/**
 * Options factory interface for creating RefineModuleOptions
 */
export interface RefineOptionsFactory {
  createRefineOptions(): Promise<RefineModuleOptions> | RefineModuleOptions;
}

/**
 * Async options for RefineModule.forRootAsync()
 *
 * Supports multiple configuration patterns:
 * - useFactory: Factory function with dependency injection
 * - useClass: Class that implements RefineOptionsFactory
 * - useExisting: Existing provider that implements RefineOptionsFactory
 *
 * Note: Resources should be registered using RefineModule.forFeature() in feature modules.
 *
 * @example
 * Using factory:
 * ```typescript
 * RefineModule.forRootAsync({
 *   useFactory: (config: ConfigService) => ({
 *     dataProvider: simpleRestDataProvider(config.get('API_URL')),
 *     authProvider: createAuthProvider(config),
 *   }),
 *   inject: [ConfigService],
 * })
 * ```
 *
 * @example
 * Using class:
 * ```typescript
 * RefineModule.forRootAsync({
 *   useClass: RefineConfigService,
 * })
 * ```
 *
 * @example
 * Using existing:
 * ```typescript
 * RefineModule.forRootAsync({
 *   useExisting: ConfigService,
 * })
 * ```
 */
export interface RefineModuleAsyncOptions {
  /**
   * Factory function that returns module options
   * Can be async or sync
   *
   * @param args - Injected dependencies
   * @returns Module options or promise of module options
   *
   * @example
   * ```typescript
   * useFactory: (config: ConfigService, http: HttpService) => ({
   *   dataProvider: createDataProvider(http, config.get('API_URL')),
   *   authProvider: createAuthProvider(config),
   * })
   * ```
   */
  useFactory?: (...args: any[]) => Promise<RefineModuleOptions> | RefineModuleOptions;

  /**
   * Class that implements RefineOptionsFactory
   * Will be instantiated and createRefineOptions() will be called
   *
   * @example
   * ```typescript
   * @Injectable()
   * class RefineConfigService implements RefineOptionsFactory {
   *   constructor(private config: ConfigService) {}
   *
   *   createRefineOptions() {
   *     return {
   *       dataProvider: simpleRestDataProvider(this.config.get('API_URL')),
   *     };
   *   }
   * }
   *
   * RefineModule.forRootAsync({
   *   useClass: RefineConfigService,
   * })
   * ```
   */
  useClass?: new (...args: any[]) => RefineOptionsFactory;

  /**
   * Existing provider that implements RefineOptionsFactory
   * Will use the existing instance
   *
   * @example
   * ```typescript
   * RefineModule.forRootAsync({
   *   useExisting: ConfigService,
   * })
   * ```
   */
  useExisting?: new (...args: any[]) => RefineOptionsFactory;

  /**
   * Dependencies to inject into the factory function
   *
   * @example
   * ```typescript
   * inject: [ConfigService, HttpService]
   * ```
   */
  inject?: any[];

  /**
   * Modules to import
   * Useful when factory depends on providers from other modules
   *
   * @example
   * ```typescript
   * imports: [ConfigModule, HttpModule]
   * ```
   */
  imports?: any[];

  /**
   * Whether the module should be global
   * If true, the module will be available throughout the application
   *
   * @default true
   */
  isGlobal?: boolean;
}
