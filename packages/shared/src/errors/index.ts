export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export const ErrorCodes = {
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export const resolveErrorMessage = (resStatus: number, payload: unknown): string => {
  if (payload && typeof payload === "object") {
    const maybeError = (payload as { error?: { code?: string; message?: string } }).error;
    if (maybeError?.message) {
      return maybeError.message;
    }
    if (maybeError?.code) {
      return `請求失敗（${maybeError.code}）`;
    }
  }
  return `請求失敗（HTTP ${resStatus}）`;
};
