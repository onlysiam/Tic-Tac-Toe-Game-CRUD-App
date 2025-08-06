export const toastTypes = {
  error: "error",
  success: "success",
} as const;

export const toastPositionTypes = {
  topLeft: "top-left",
  topCentered: "top-centered",
  topRight: "top-right",
  bottomLeft: "bottom-left",
  bottomCentered: "bottom-centered",
  bottomRight: "bottom-right",
  leftBottom: "left-bottom",
} as const;

export type ToastType = (typeof toastTypes)[keyof typeof toastTypes]; //'error' || 'success'

export type ToastPositionType = (typeof toastPositionTypes)[keyof typeof toastPositionTypes]; // 'top-left' | 'top-centered' | ...
