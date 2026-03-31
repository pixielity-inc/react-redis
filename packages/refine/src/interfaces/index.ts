/**
 * Interfaces
 *
 * Type definitions and interfaces for Refine module configuration.
 *
 * @module @abdokouta/refine
 */

// Configuration
export type {
  RefineConfig,
  DataProvider,
  DataProviders,
  AuthProvider,
  AccessControlProvider,
  LiveProvider,
  LiveModeProps,
  NotificationProvider,
  I18nProvider,
  AuditLogProvider,
  IRefineOptions,
} from './refine-config.interface';

// Module Options
export type { RefineModuleOptions } from './refine-module-options.interface';
export type {
  RefineModuleAsyncOptions,
  RefineOptionsFactory,
} from './refine-module-async-options.interface';
