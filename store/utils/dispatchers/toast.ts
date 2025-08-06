import { Dispatch } from "redux";
import { triggerToast } from "@store/modules/global/toast";
import { toastTypes } from "@resources/types/toast";
import { generalErrorMessages } from "@resources/messages/error";

interface DispatchSuccessToastsParams {
  dispatch: Dispatch<any>;
  onSuccess: string;
  payload?: any;
}

interface DispatchErrorToastsParams {
  dispatch: Dispatch<any>;
  payload?: { code?: string; [key: string]: any };
}

export function dispatchSuccessToasts({
  dispatch,
  onSuccess,
  payload,
}: DispatchSuccessToastsParams): void {
  dispatch(
    triggerToast({
      toastData: payload || "",
      toastType: toastTypes.success,
      toastHeading: "Success",
      toastDescription: "",
      toastPosition: "top-right",
    })
  );
}

export const dispatchErrorToasts = ({ dispatch, payload }: DispatchErrorToastsParams): void => {
  dispatch(
    triggerToast({
      toastData: payload || "",
      toastType: toastTypes.error,
      toastHeading: generalErrorMessages.serverError,
      toastDescription: generalErrorMessages.somethingWentWrong,
      toastPosition: "top-right",
    })
  );
};
