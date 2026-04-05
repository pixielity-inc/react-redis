/**
 * Refine Configuration
 *
 * Unified configuration for Refine Framework with dependency injection.
 * All data providers, authentication, and options are defined in a single config object.
 *
 * This follows the Laravel-style configuration pattern where all settings
 * are centralized and can be easily modified based on environment.
 *
 * @module config/refine
 *
 * @example
 * ```typescript
 * import refineConfig from '@/config/refine.config';
 *
 * @Module({
 *   imports: [RefineModule.forRoot(refineConfig)],
 * })
 * export class AppModule {}
 * ```
 *
 * @see https://refine.dev/docs/core/refine-component
 */

import { defineConfig } from "@abdokouta/refine";
import dataProvider from "@refinedev/simple-rest";

/**
 * API Configuration
 *
 * Base URL for the REST API. Can be configured via environment variables.
 */
const API_URL =
  import.meta.env.VITE_API_URL || "https://api.fake-rest.refine.dev";

/**
 * Refine configuration
 *
 * Single unified configuration object for the Refine framework.
 * Uses environment variables for configuration where applicable.
 *
 * Environment Variables:
 * - VITE_API_URL: Base URL for the REST API
 * - VITE_APP_NAME: Application name for branding
 * - NODE_ENV: Environment (development/production/test)
 */
export const refineConfig = defineConfig({
  /*
  |--------------------------------------------------------------------------
  | Data Provider
  |--------------------------------------------------------------------------
  |
  | The data provider handles all API interactions including CRUD operations.
  | Refine supports multiple data providers for different backends.
  |
  | Available providers:
  | - @refinedev/simple-rest: Simple REST API
  | - @refinedev/nestjsx-crud: NestJS CRUD
  | - @refinedev/strapi-v4: Strapi v4
  | - @refinedev/supabase: Supabase
  | - @refinedev/graphql: GraphQL
  | - @refinedev/hasura: Hasura GraphQL
  | - @refinedev/appwrite: Appwrite
  | - @refinedev/airtable: Airtable
  |
  | @see https://refine.dev/docs/data/data-provider
  |
  */
  dataProvider: dataProvider(API_URL),

  /*
  |--------------------------------------------------------------------------
  | Authentication Provider (Optional)
  |--------------------------------------------------------------------------
  |
  | The auth provider handles user authentication including login, logout,
  | registration, password reset, and user identity management.
  |
  | Uncomment and configure based on your authentication backend.
  |
  | @see https://refine.dev/docs/authentication/auth-provider
  |
  | @example
  | ```typescript
  | authProvider: {
  |   login: async ({ email, password }) => {
  |     const response = await fetch(`${API_URL}/auth/login`, {
  |       method: 'POST',
  |       body: JSON.stringify({ email, password }),
  |     });
  |     const data = await response.json();
  |     if (data.token) {
  |       localStorage.setItem('token', data.token);
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
  |   getIdentity: async () => {
  |     const token = localStorage.getItem('token');
  |     if (!token) return null;
  |     // Fetch user data from API
  |     return { id: 1, name: 'John Doe', avatar: '/avatar.png' };
  |   },
  |   onError: async (error) => {
  |     if (error.status === 401) {
  |       return { logout: true, redirectTo: '/login' };
  |     }
  |     return { error };
  |   },
  | },
  | ```
  */
  authProvider: undefined,

  /*
  |--------------------------------------------------------------------------
  | Access Control Provider (Optional)
  |--------------------------------------------------------------------------
  |
  | The access control provider handles authorization and permissions.
  | It determines what actions users can perform on resources.
  |
  | @see https://refine.dev/docs/authorization/access-control-provider
  |
  | @example
  | ```typescript
  | accessControlProvider: {
  |   can: async ({ resource, action, params }) => {
  |     // Check user permissions
  |     const userRole = localStorage.getItem('role');
  |
  |     // Admin can do everything
  |     if (userRole === 'admin') {
  |       return { can: true };
  |     }
  |
  |     // Editor can only edit and view
  |     if (userRole === 'editor' && ['list', 'show', 'edit'].includes(action)) {
  |       return { can: true };
  |     }
  |
  |     // Viewer can only view
  |     if (userRole === 'viewer' && ['list', 'show'].includes(action)) {
  |       return { can: true };
  |     }
  |
  |     return {
  |       can: false,
  |       reason: 'Unauthorized',
  |     };
  |   },
  | },
  | ```
  */
  accessControlProvider: undefined,

  /*
  |--------------------------------------------------------------------------
  | Live Provider (Optional)
  |--------------------------------------------------------------------------
  |
  | The live provider enables real-time updates using WebSockets or
  | other real-time technologies.
  |
  | @see https://refine.dev/docs/realtime/live-provider
  |
  | @example
  | ```typescript
  | liveProvider: {
  |   subscribe: ({ channel, types, callback }) => {
  |     const ws = new WebSocket(`wss://api.example.com/ws/${channel}`);
  |     ws.onmessage = (event) => {
  |       const data = JSON.parse(event.data);
  |       if (types.includes(data.type)) {
  |         callback(data);
  |       }
  |     };
  |     return () => ws.close();
  |   },
  |   unsubscribe: (subscription) => {
  |     subscription();
  |   },
  | },
  | ```
  */
  liveProvider: undefined,

  /*
  |--------------------------------------------------------------------------
  | Notification Provider (Optional)
  |--------------------------------------------------------------------------
  |
  | The notification provider handles displaying notifications to users.
  | Integrates with UI libraries like Ant Design, Material UI, etc.
  |
  | @see https://refine.dev/docs/notification/notification-provider
  |
  | @example
  | ```typescript
  | notificationProvider: {
  |   open: ({ message, description, type }) => {
  |     // Show notification using your preferred library
  |     toast[type](message, { description });
  |   },
  |   close: (key) => {
  |     // Close notification by key
  |     toast.dismiss(key);
  |   },
  | },
  | ```
  */
  notificationProvider: undefined,

  /*
  |--------------------------------------------------------------------------
  | Internationalization Provider (Optional)
  |--------------------------------------------------------------------------
  |
  | The i18n provider handles translations and localization.
  | Integrates with libraries like react-i18next.
  |
  | @see https://refine.dev/docs/i18n/i18n-provider
  |
  | @example
  | ```typescript
  | i18nProvider: {
  |   translate: (key, options) => i18n.t(key, options),
  |   changeLocale: (lang) => i18n.changeLanguage(lang),
  |   getLocale: () => i18n.language,
  | },
  | ```
  */
  i18nProvider: undefined,

  /*
  |--------------------------------------------------------------------------
  | Audit Log Provider (Optional)
  |--------------------------------------------------------------------------
  |
  | The audit log provider tracks changes to data for compliance
  | and debugging purposes.
  |
  | @see https://refine.dev/docs/audit-logs/audit-log-provider
  |
  | @example
  | ```typescript
  | auditLogProvider: {
  |   create: async ({ resource, action, data, previousData, meta }) => {
  |     await fetch(`${API_URL}/audit-logs`, {
  |       method: 'POST',
  |       body: JSON.stringify({
  |         resource,
  |         action,
  |         data,
  |         previousData,
  |         timestamp: new Date().toISOString(),
  |         userId: meta?.userId,
  |       }),
  |     });
  |   },
  |   get: async ({ resource, action, meta }) => {
  |     const response = await fetch(
  |       `${API_URL}/audit-logs?resource=${resource}&action=${action}`
  |     );
  |     return response.json();
  |   },
  |   update: async ({ id, name }) => {
  |     await fetch(`${API_URL}/audit-logs/${id}`, {
  |       method: 'PATCH',
  |       body: JSON.stringify({ name }),
  |     });
  |   },
  | },
  | ```
  */
  auditLogProvider: undefined,

  /*
  |--------------------------------------------------------------------------
  | Live Event Callback (Optional)
  |--------------------------------------------------------------------------
  |
  | Callback function that is called when a live event is received.
  | Useful for custom handling of real-time updates.
  |
  | @example
  | ```typescript
  | onLiveEvent: (event) => {
  |   console.log('Live event received:', event);
  |   // Custom handling logic
  | },
  | ```
  */
  onLiveEvent: undefined,

  /*
  |--------------------------------------------------------------------------
  | Refine Options
  |--------------------------------------------------------------------------
  |
  | Global options for Refine behavior including mutation modes,
  | sync settings, and UI preferences.
  |
  | @see https://refine.dev/docs/core/refine-component#options
  |
  */
  options: {
    /*
    |--------------------------------------------------------------------------
    | Mutation Mode
    |--------------------------------------------------------------------------
    |
    | Determines how mutations (create, update, delete) are handled:
    |
    | - 'pessimistic': Wait for server response before updating UI (safest)
    | - 'optimistic': Update UI immediately, rollback on error (fastest UX)
    | - 'undoable': Show undo notification, delay actual mutation
    |
    | Default: 'pessimistic'
    |
    */
    mutationMode: "pessimistic",

    /*
    |--------------------------------------------------------------------------
    | Undoable Timeout
    |--------------------------------------------------------------------------
    |
    | Time in milliseconds to wait before executing mutation in 'undoable' mode.
    | During this time, user can undo the action.
    |
    | Default: 5000 (5 seconds)
    |
    */
    undoableTimeout: 5000,

    /*
    |--------------------------------------------------------------------------
    | Sync With Location
    |--------------------------------------------------------------------------
    |
    | When enabled, syncs resource state with URL parameters.
    | Useful for sharing filtered/sorted views via URL.
    |
    | Default: false
    |
    */
    syncWithLocation: true,

    /*
    |--------------------------------------------------------------------------
    | Warn When Unsaved Changes
    |--------------------------------------------------------------------------
    |
    | When enabled, shows a warning when user tries to leave a page
    | with unsaved form changes.
    |
    | Default: false
    |
    */
    warnWhenUnsavedChanges: true,

    /*
    |--------------------------------------------------------------------------
    | Use New Query Keys
    |--------------------------------------------------------------------------
    |
    | When enabled, uses the new query key format for React Query.
    | Recommended for new projects.
    |
    | Default: false
    |
    */
    useNewQueryKeys: true,

    /*
    |--------------------------------------------------------------------------
    | Live Mode
    |--------------------------------------------------------------------------
    |
    | Controls real-time update behavior:
    |
    | - 'auto': Automatically refetch on live events
    | - 'manual': Manually handle live events via onLiveEvent
    | - 'off': Disable live updates
    |
    | Default: 'off'
    |
    */
    liveMode: "off",

    /*
    |--------------------------------------------------------------------------
    | Disable Telemetry
    |--------------------------------------------------------------------------
    |
    | When enabled, disables anonymous usage telemetry sent to Refine.
    |
    | Default: false
    |
    */
    disableTelemetry: true,

    /*
    |--------------------------------------------------------------------------
    | Project ID (Optional)
    |--------------------------------------------------------------------------
    |
    | Unique identifier for your project. Used for telemetry and
    | Refine Cloud features.
    |
    */
    // projectId: 'your-project-id',

    /*
    |--------------------------------------------------------------------------
    | Redirect After Actions
    |--------------------------------------------------------------------------
    |
    | Configure where to redirect after CRUD operations.
    |
    | Options: 'list' | 'show' | 'edit' | false
    |
    */
    redirect: {
      /**
       * Redirect after creating a new record
       * Default: 'list'
       */
      afterCreate: "list",

      /**
       * Redirect after cloning a record
       * Default: 'edit'
       */
      afterClone: "edit",

      /**
       * Redirect after editing a record
       * Default: 'list'
       */
      afterEdit: "list",
    },

    /*
    |--------------------------------------------------------------------------
    | React Query Options (Optional)
    |--------------------------------------------------------------------------
    |
    | Global options for React Query. These are passed to QueryClient.
    |
    | @see https://tanstack.com/query/latest/docs/react/reference/QueryClient
    |
    | @example
    | ```typescript
    | reactQuery: {
    |   clientConfig: {
    |     defaultOptions: {
    |       queries: {
    |         staleTime: 5 * 60 * 1000, // 5 minutes
    |         cacheTime: 10 * 60 * 1000, // 10 minutes
    |         retry: 3,
    |         refetchOnWindowFocus: false,
    |       },
    |     },
    |   },
    | },
    | ```
    */
    // reactQuery: {},

    /*
    |--------------------------------------------------------------------------
    | Breadcrumb (Optional)
    |--------------------------------------------------------------------------
    |
    | Configure breadcrumb behavior.
    |
    | - true: Show breadcrumbs
    | - false: Hide breadcrumbs
    |
    | Default: true
    |
    */
    // breadcrumb: true,

    /*
    |--------------------------------------------------------------------------
    | Text Transform Mode (Optional)
    |--------------------------------------------------------------------------
    |
    | How to transform resource names for display:
    |
    | - 'humanize': Convert 'blog_posts' to 'Blog posts'
    | - 'plural': Convert 'post' to 'posts'
    | - 'singular': Convert 'posts' to 'post'
    |
    | Default: 'humanize'
    |
    */
    // textTransformers: {
    //   humanize: (text) => text.replace(/_/g, ' '),
    //   plural: (text) => `${text}s`,
    //   singular: (text) => text.replace(/s$/, ''),
    // },
  },
});

export default refineConfig;
