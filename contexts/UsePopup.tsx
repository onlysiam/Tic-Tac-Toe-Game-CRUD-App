"use client";
import React, { createContext, useContext, useState } from "react";

export type PopupContextType = {
  messagePopupObj: contextRetrunObjType;
  deleteProductPopupObj: contextRetrunObjType;
};
type contextRetrunObjType = {
  data: popupDataStateType;
  action?: any;
  show: boolean;
  open: (args: popupDataStateType) => void;
  close: () => void;
};
type popupDataStateType = {
  popupData?: any;
  popupAction?: any;
  popupType?: string;
};

const UsePopupContext = createContext<PopupContextType | any>({});

export const usePopup = () => useContext(UsePopupContext) as PopupContextType;

const UsePopupContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  //
  //message popups
  const [messagePopupDataState, setMessagePopupDataState] = useState<popupDataStateType>({
    popupData: "",
    popupType: "",
  });
  const [showMessagePopupState, setShowMessagePopupState] = useState(false);
  const openMessagePopup = ({ popupData, popupAction, popupType }: popupDataStateType) => {
    setShowMessagePopupState(true);
    setMessagePopupDataState({ popupData, popupAction, popupType });
  };
  const closeMessagePopup = () => {
    setShowMessagePopupState(false);
  };

  //
  //delete product popup
  const [deleteProductPopupActionState, setDeleteProductPopupActionState] =
    useState<popupDataStateType>({
      popupAction: () => {},
    });
  const [showDeleteProductPopupState, setShowDeleteProductPopupState] = useState<boolean>(false);
  const opendDleteProductPopup = ({ popupAction }: popupDataStateType) => {
    setShowDeleteProductPopupState(true);
    setDeleteProductPopupActionState({ popupAction });
  };
  const closeDeleteProductPopup = () => {
    setShowDeleteProductPopupState(false);
  };

  return (
    <UsePopupContext.Provider
      value={{
        messagePopupObj: {
          data: messagePopupDataState,
          show: showMessagePopupState,
          open: openMessagePopup,
          close: closeMessagePopup,
        },
        deleteProductPopupObj: {
          action: deleteProductPopupActionState,
          show: showDeleteProductPopupState,
          open: opendDleteProductPopup,
          close: closeDeleteProductPopup,
        },
      }}
    >
      {children}
    </UsePopupContext.Provider>
  );
};

export default UsePopupContextProvider;
