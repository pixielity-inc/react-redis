/**
 * @fileoverview useMany Hook Types
 *
 * Type definitions for the enhanced useMany hook.
 *
 * @module @abdokouta/refine
 * @category Hooks
 */

import type { QueryObserverResult } from '@tanstack/react-query';
import type {
  BaseRecord,
  HttpError,
  GetManyResponse,
  UseManyProps as UseManyPropsOriginal,
} from '@refinedev/core';

/**
 * Props for useMany hook
 */
export type UseManyProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
> = UseManyPropsOriginal<TQueryFnData, TError, TData>;

/**
 * Return type for useMany hook
 */
export interface UseManyReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
> {
  /** The fetched data array */
  data: TData[];
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
  refetch: QueryObserverResult<GetManyResponse<TData>, TError>['refetch'];
  /** Original query object for advanced usage */
  query: QueryObserverResult<GetManyResponse<TData>, TError>;
  /** Overtime information */
  overtime: {
    elapsedTime?: number;
  };
}
