import { combineComponents } from "@lib/utils/components";

//react context
import UsePopupContextProvider from "@contexts/UsePopup";

const providers = [UsePopupContextProvider];

export default combineComponents(...providers);
