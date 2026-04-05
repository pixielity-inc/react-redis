/**
 * @fileoverview useShow Hook Types
 *
 * Type definitions for the enhanced useShow hook.
 *
 * @module @abdokouta/refine
 * @category Hooks
 */

import type React from 'react';
import type { QueryObserverResult } from '@tanstack/react-query';
import type {
  BaseRecord,
  HttpError,
  GetOneResponse,
  BaseKey,
  UseShowProps as UseShowPropsOriginal,
} from '@refinedev/core';

/**
 * Props for useShow hook
 */
export type UseShowProps<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData,
> = UseShowPropsOriginal<TQueryFnData, TError, TData>;

/**
 * Return type for useShow hook
 */
export interface UseShowReturnType<
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
  /** Current show ID */
  showId: BaseKey | undefined;
  /** Function to set the show ID */
  setShowId: React.Dispatch<React.SetStateAction<BaseKey | undefined>>;
  /** Refetch function */
  refetch: QueryObserverResult<GetOneResponse<TData>, TError>['refetch'];
  /** Original query object for advanced usage */
  query: QueryObserverResult<GetOneResponse<TData>, TError>;
  /** Overtime information */
  overtime: {
    elapsedTime?: number;
  };
}
