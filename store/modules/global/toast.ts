import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// types
import {
  toastPositionTypes,
  toastTypes,
  ToastPositionType,
  ToastType,
} from "@resources/types/toast";

interface ToastState {
  toastData: any;
  toastType: ToastType | "";
  toastPosition: ToastPositionType;
  toastHeading: string;
  toastDescription: string;
  isPersist: boolean;
  showToast: boolean;
}

interface TriggerToastPayload {
  toastData?: any;
  toastType?: ToastType;
  toastPosition?: ToastPositionType;
  toastHeading?: string;
  toastDescription?: string;
}

const initialState: ToastState = {
  toastData: "",
  toastType: "",
  toastPosition: toastPositionTypes.bottomLeft,
  toastHeading: "",
  toastDescription: "",
  isPersist: false,
  showToast: false,
};

const slice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    triggerToast: (state, action: PayloadAction<TriggerToastPayload>) => {
      const { toastData, toastType, toastPosition, toastHeading, toastDescription } =
        action.payload;

      if (toastType) state.showToast = true;

      state.toastData = toastData ?? "";
      state.toastType = toastType ?? "";
      state.toastPosition = toastPosition ?? state.toastPosition;
      state.toastHeading = toastHeading ?? "";
      state.toastDescription = toastDescription ?? "";

      if (toastType === toastTypes.error) {
        state.isPersist = true;
      } else {
        state.isPersist = false;
      }
    },
    setToastPosition: (state, action: PayloadAction<ToastPositionType>) => {
      state.toastPosition = action.payload;
    },
    closeToast: (state) => {
      state.showToast = false;
    },
  },
});

export const { triggerToast, setToastPosition, closeToast } = slice.actions;

export default slice.reducer;
