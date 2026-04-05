/**
 * Refine Configuration
 *
 * Configuration for the @abdokouta/refine package.
 * Provides comprehensive Refine setup including providers and options.
 *
 * Note: Resources are managed separately via RefineModule.forFeature()
 *
 * @module config/refine
 *
 * @example
 * ```typescript
 * import { refineConfig } from '@/config/refine.config';
 *
 * @Module({
 *   imports: [RefineModule.forRoot(refineConfig)],
 * })
 * export class AppModule {}
 * ```
 */

import { defineConfig } from '../src/utils';

/**
 * Refine configuration
 *
 * Configure your Refine application with providers and options.
 * Resources should be registered using RefineModule.forFeature() in feature modules.
 *
 * Environment Variables:
 * - VITE_API_URL: Base URL for the API
 * - VITE_PROJECT_ID: Refine project ID (optional)
 */
export const refineConfig = defineConfig({
  /*
  |--------------------------------------------------------------------------
  | Data Provider
  |--------------------------------------------------------------------------
  |
  | The data provider handles all API interactions.
  | You can use built-in providers or create custom ones.
  |
  | Built-in providers:
  | - @refinedev/simple-rest
  | - @refinedev/graphql
  | - @refinedev/supabase
  | - @refinedev/strapi-v4
  | - @refinedev/hasura
  | - @refinedev/appwrite
  |
  | @see https://refine.dev/docs/api-reference/core/providers/data-provider/
  |
  | Example:
  | ```typescript
  | import { dataProvider } from '@refinedev/simple-rest';
  | dataProvider: dataProvider(import.meta.env.VITE_API_URL),
  | ```
  |
  | Multiple providers:
  | ```typescript
  | dataProvider: {
  |   default: simpleRestDataProvider(import.meta.env.VITE_API_URL),
  |   graphql: graphqlDataProvider(client),
  | },
  | ```
  |
  */
  // dataProvider: undefined,

  /*
  |--------------------------------------------------------------------------
  | Auth Provider
  |--------------------------------------------------------------------------
  |
  | The auth provider handles authentication logic.
  |
  | @see https://refine.dev/docs/api-reference/core/providers/auth-provider/
  |
  | Example:
  | ```typescript
  | authProvider: {
  |   login: async ({ email, password }) => {
  |     const response = await fetch('/api/auth/login', {
  |       method: 'POST',
  |       body: JSON.stringify({ email, password }),
  |     });
  |     if (response.ok) {
  |       return { success: true, redirectTo: '/' };
  |     }
  |     return { success: false, error: { message: 'Invalid credentials' } };
  |   },
  |   logout: async () => {
  |     localStorage.removeItem('token');
  |     return { success: true, redirectTo: '/login' };
  |   },
  |   check: async () => {
  |     const token = localStorage.getItem('token');
  |     return { authenticated: !!token };
  |   },
  |   onError: async (error) => {
  |     if (error.status === 401) {
  |       return { logout: true, redirectTo: '/login' };
  |     }
  |     return {};
  |   },
  |   getIdentity: async () => {
  |     const user = JSON.parse(localStorage.getItem('user') || '{}');
  |     return user;
  |   },
  | },
  | ```
  |
  */
  // authProvider: undefined,

  /*
  |--------------------------------------------------------------------------
  | Access Control Provider
  |--------------------------------------------------------------------------
  |
  | The access control provider handles authorization.
  |
  | @see https://refine.dev/docs/api-reference/core/providers/accessControl-provider/
  |
  | Example:
  | ```typescript
  | accessControlProvider: {
  |   can: async ({ resource, action, params }) => {
  |     const user = await getUser();
  |     const permissions = user.permissions || [];
  |
  |     if (permissions.includes(`${resource}.${action}`)) {
  |       return { can: true };
  |     }
  |
  |     return {
  |       can: false,
  |       reason: 'You do not have permission to perform this action',
  |     };
  |   },
  | },
  | ```
  |
  */
  // accessControlProvider: undefined,

  /*
  |--------------------------------------------------------------------------
  | Live Provider
  |--------------------------------------------------------------------------
  |
  | The live provider enables real-time updates.
  |
  | @see https://refine.dev/docs/api-reference/core/providers/live-provider/
  |
  | Built-in providers:
  | - @refinedev/ably
  | - @refinedev/supabase (includes live support)
  |
  */
  // liveProvider: undefined,

  /*
  |--------------------------------------------------------------------------
  | Notification Provider
  |--------------------------------------------------------------------------
  |
  | The notification provider handles displaying notifications.
  |
  | @see https://refine.dev/docs/api-reference/core/providers/notification-provider/
  |
  | UI libraries provide their own notification providers:
  | - @refinedev/antd
  | - @refinedev/mui
  | - @refinedev/chakra-ui
  | - @refinedev/mantine
  |
  */
  // notificationProvider: undefined,

  /*
  |--------------------------------------------------------------------------
  | i18n Provider
  |--------------------------------------------------------------------------
  |
  | The i18n provider handles internationalization.
  |
  | @see https://refine.dev/docs/api-reference/core/providers/i18n-provider/
  |
  | Example with react-i18next:
  | ```typescript
  | import { useTranslation } from 'react-i18next';
  |
  | i18nProvider: {
  |   translate: (key, options) => t(key, options),
  |   changeLocale: (lang) => i18n.changeLanguage(lang),
  |   getLocale: () => i18n.language,
  | },
  | ```
  |
  */
  // i18nProvider: undefined,

  /*
  |--------------------------------------------------------------------------
  | Audit Log Provider
  |--------------------------------------------------------------------------
  |
  | The audit log provider tracks changes to data.
  |
  | @see https://refine.dev/docs/api-reference/core/providers/audit-log-provider/
  |
  */
  // auditLogProvider: undefined,

  /*
  |--------------------------------------------------------------------------
  | Options
  |--------------------------------------------------------------------------
  |
  | Global options for Refine behavior.
  |
  | @see https://refine.dev/docs/api-reference/core/components/refine-config/#options
  |
  */
  options: {
    /**
     * Mutation mode for data operations
     * - pessimistic: Wait for server response before updating UI
     * - optimistic: Update UI immediately, rollback on error
     * - undoable: Update UI immediately with undo option
     */
    mutationMode: 'pessimistic',

    /**
     * Sync resource state with URL
     */
    syncWithLocation: false,

    /**
     * Warn user when leaving page with unsaved changes
     */
    warnWhenUnsavedChanges: false,

    /**
     * Timeout for undoable mutations (ms)
     */
    undoableTimeout: 5000,

    /**
     * Live mode for real-time updates
     */
    liveMode: 'off',

    /**
     * Disable telemetry
     */
    disableTelemetry: false,

    /**
     * Redirect configuration after form actions
     */
    redirect: {
      afterCreate: 'list',
      afterClone: 'edit',
      afterEdit: 'list',
    },
  },
});

export default refineConfig;
