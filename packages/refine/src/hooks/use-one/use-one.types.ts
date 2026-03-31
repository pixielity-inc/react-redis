/**
 * @fileoverview useOne Hook Types
 *
 * Type definitions for the enhanced useOne hook.
 *
 * @module @abdokouta/refine
 * @category Hooks
 */

import type { QueryObserverResult } from '@tanstack/react-query';
import type {
  BaseRecord,
  HttpError,
  GetOneResponse,
  UseOneProps as UseOnePropsOriginal,
} from '@refinedev/core';

/**
 * Props for useOne hook
 */
export type UseOneProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
> = UseOnePropsOriginal<TQueryFnData, TError, TData>;

/**
 * Return type for useOne hook
 */
export interface UseOneReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
> {
  /** The fetched data */
  data: TData | undefined;
  /** Loading state - true while fetching */
  isLoading: boolean;
  /** Fetching state - true during refetch */
  isFetching: boolean;
  /** Error state */
  isError: boolean;
  /** Success state */
  isSuccess: boolean;
  /** Error object if request failed */
  error: TError | null;
  /** Refetch function */
  refetch: QueryObserverResult<GetOneResponse<TData>, TError>['refetch'];
  /** Original query object for advanced usage */
  query: QueryObserverResult<GetOneResponse<TData>, TError>;
  /** Overtime information */
  overtime: {
    elapsedTime?: number;
  };
}
