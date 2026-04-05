/**
 * Refine DI Tokens
 *
 * Dependency injection tokens for the Refine module.
 * These symbols are used to inject Refine providers and configuration
 * throughout the application.
 *
 * @module @abdokouta/refine
 *
 * @example
 * ```typescript
 * import { Inject } from '@abdokouta/react-di';
 * import { REFINE_DATA_PROVIDER } from '@abdokouta/refine';
 * import type { DataProvider } from '@refinedev/core';
 *
 * class MyService {
 *   constructor(
 *     @Inject(REFINE_DATA_PROVIDER) private dataProvider: DataProvider
 *   ) {}
 * }
 * ```
 */

/**
 * Token for injecting the complete Refine configuration
 *
 * @example
 * ```typescript
 * @Inject(REFINE_CONFIG) config: RefineConfig
 * ```
 */
export const REFINE_CONFIG = Symbol('REFINE_CONFIG');

/**
 * Token for injecting the data provider
 *
 * The data provider handles all API interactions including
 * CRUD operations, custom queries, and data fetching.
 *
 * @see https://refine.dev/docs/api-reference/core/providers/data-provider/
 *
 * @example
 * ```typescript
 * @Inject(REFINE_DATA_PROVIDER) dataProvider: DataProvider
 * ```
 */
export const REFINE_DATA_PROVIDER = Symbol('REFINE_DATA_PROVIDER');

/**
 * Token for injecting the authentication provider
 *
 * The auth provider handles login, logout, user identity,
 * and authentication state management.
 *
 * @see https://refine.dev/docs/api-reference/core/providers/auth-provider/
 *
 * @example
 * ```typescript
 * @Inject(REFINE_AUTH_PROVIDER) authProvider: AuthProvider
 * ```
 */
export const REFINE_AUTH_PROVIDER = Symbol('REFINE_AUTH_PROVIDER');

/**
 * Token for injecting the access control provider
 *
 * The access control provider handles authorization,
 * permissions, and role-based access control.
 *
 * @see https://refine.dev/docs/api-reference/core/providers/accessControl-provider/
 *
 * @example
 * ```typescript
 * @Inject(REFINE_ACCESS_CONTROL_PROVIDER) accessControlProvider: AccessControlProvider
 * ```
 */
export const REFINE_ACCESS_CONTROL_PROVIDER = Symbol('REFINE_ACCESS_CONTROL_PROVIDER');

/**
 * Token for injecting the live provider
 *
 * The live provider enables real-time updates and
 * subscriptions to data changes.
 *
 * @see https://refine.dev/docs/api-reference/core/providers/live-provider/
 *
 * @example
 * ```typescript
 * @Inject(REFINE_LIVE_PROVIDER) liveProvider: LiveProvider
 * ```
 */
export const REFINE_LIVE_PROVIDER = Symbol('REFINE_LIVE_PROVIDER');

/**
 * Token for injecting the notification provider
 *
 * The notification provider handles displaying
 * success, error, and info notifications to users.
 *
 * @see https://refine.dev/docs/api-reference/core/providers/notification-provider/
 *
 * @example
 * ```typescript
 * @Inject(REFINE_NOTIFICATION_PROVIDER) notificationProvider: NotificationProvider
 * ```
 */
export const REFINE_NOTIFICATION_PROVIDER = Symbol('REFINE_NOTIFICATION_PROVIDER');

/**
 * Token for injecting the i18n provider
 *
 * The i18n provider handles internationalization,
 * translations, and locale management.
 *
 * @see https://refine.dev/docs/api-reference/core/providers/i18n-provider/
 *
 * @example
 * ```typescript
 * @Inject(REFINE_I18N_PROVIDER) i18nProvider: I18nProvider
 * ```
 */
export const REFINE_I18N_PROVIDER = Symbol('REFINE_I18N_PROVIDER');

/**
 * Token for injecting the audit log provider
 *
 * The audit log provider tracks changes to data
 * and maintains an audit trail of operations.
 *
 * @see https://refine.dev/docs/api-reference/core/providers/audit-log-provider/
 *
 * @example
 * ```typescript
 * @Inject(REFINE_AUDIT_LOG_PROVIDER) auditLogProvider: AuditLogProvider
 * ```
 */
export const REFINE_AUDIT_LOG_PROVIDER = Symbol('REFINE_AUDIT_LOG_PROVIDER');

/**
 * Token for injecting Refine options
 *
 * The options object contains global configuration
 * for Refine behavior like mutation mode, sync with location, etc.
 *
 * @see https://refine.dev/docs/api-reference/core/components/refine-config/#options
 *
 * @example
 * ```typescript
 * @Inject(REFINE_OPTIONS) options: IRefineOptions
 * ```
 */
export const REFINE_OPTIONS = Symbol('REFINE_OPTIONS');
