/**
 * Refine Configuration Interface
 *
 * Comprehensive configuration interface for Refine applications.
 * Mirrors the RefineProps from @refinedev/core with additional DI-specific options.
 *
 * Note: Resources are managed separately via RefineModule.forFeature()
 *
 * @module @abdokouta/refine
 */

import type {
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
} from '@refinedev/core';

/**
 * Complete Refine configuration
 *
 * Note: Resources are managed separately via RefineModule.forFeature()
 *
 * @example
 * ```typescript
 * const config: RefineConfig = {
 *   dataProvider: simpleRestDataProvider('https://api.example.com'),
 *   authProvider: myAuthProvider,
 *   options: {
 *     mutationMode: 'optimistic',
 *     syncWithLocation: true,
 *   },
 * };
 * ```
 */
export interface RefineConfig {
  /**
   * Data provider for API interactions
   * Can be a single provider or multiple named providers
   */
  dataProvider?: DataProvider | DataProviders;

  /**
   * Authentication provider
   * Handles login, logout, and user identity
   */
  authProvider?: AuthProvider;

  /**
   * Access control provider
   * Handles authorization and permissions
   */
  accessControlProvider?: AccessControlProvider;

  /**
   * Live provider for real-time updates
   */
  liveProvider?: LiveProvider;

  /**
   * Notification provider
   * Handles displaying notifications to users
   */
  notificationProvider?: NotificationProvider | (() => NotificationProvider);

  /**
   * Internationalization provider
   */
  i18nProvider?: I18nProvider;

  /**
   * Audit log provider
   * Tracks changes to data
   */
  auditLogProvider?: AuditLogProvider;

  /**
   * Callback for live events
   */
  onLiveEvent?: LiveModeProps['onLiveEvent'];

  /**
   * Refine options
   * @see IRefineOptions from @refinedev/core
   */
  options?: IRefineOptions;
}

// Re-export useful types from @refinedev/core for convenience
export type {
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
} from '@refinedev/core';
