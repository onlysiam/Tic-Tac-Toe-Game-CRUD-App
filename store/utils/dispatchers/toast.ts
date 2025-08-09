import { Dispatch } from "redux";
import { triggerToast } from "@store/modules/global/toast";
import { toastTypes } from "@resources/types/toast";
import { generalErrorMessages, productErrorMessages } from "@resources/messages/error";
import { productSuccessMessages } from "@resources/messages/success";

interface DispatchSuccessToastsParams {
  dispatch: Dispatch<any>;
  onSuccess: string;
  payload?: any;
}

interface DispatchErrorToastsParams {
  dispatch: Dispatch<any>;
  payload?: { code?: string; [key: string]: any };
  onError?: string;
}

export function dispatchSuccessToasts({
  dispatch,
  onSuccess,
  payload,
}: DispatchSuccessToastsParams): void {
  if (onSuccess && productSuccessMessages[onSuccess as keyof typeof productSuccessMessages]) {
    dispatch(
      triggerToast({
        toastData: payload || "",
        toastType: toastTypes.success,
        toastDescription: productSuccessMessages[onSuccess as keyof typeof productSuccessMessages],
      })
    );
  }
}

export const dispatchErrorToasts = ({
  dispatch,
  payload,
  onError,
}: DispatchErrorToastsParams): void => {
  if (onError && productErrorMessages[onError as keyof typeof productErrorMessages]) {
    dispatch(
      triggerToast({
        toastData: payload || "",
        toastType: toastTypes.error,
        toastDescription: productErrorMessages[onError as keyof typeof productErrorMessages],
      })
    );
  } else {
    dispatch(
      triggerToast({
        toastData: payload || "",
        toastType: toastTypes.error,
        toastHeading: generalErrorMessages.serverError,
      })
    );
  }
};
