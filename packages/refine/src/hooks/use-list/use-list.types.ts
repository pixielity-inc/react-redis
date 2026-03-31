/**
 * @fileoverview useList Hook Types
 *
 * Type definitions for the enhanced useList hook.
 *
 * @module @abdokouta/refine
 * @category Hooks
 */

import type { QueryObserverResult } from '@tanstack/react-query';
import type {
  BaseRecord,
  HttpError,
  GetListResponse,
  UseListProps as UseListPropsOriginal,
} from '@refinedev/core';

/**
 * Props for useList hook
 */
export type UseListProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
> = UseListPropsOriginal<TQueryFnData, TError, TData>;

/**
 * Return type for useList hook
 */
export interface UseListReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
> {
  /** The fetched data array */
  data: TData[];
  /** Total count of records */
  total: number | undefined;
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
  refetch: QueryObserverResult<GetListResponse<TData>, TError>['refetch'];
  /** Original query object for advanced usage */
  query: QueryObserverResult<GetListResponse<TData>, TError>;
  /** Overtime information */
  overtime: {
    elapsedTime?: number;
  };
}
