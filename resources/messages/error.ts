export const productErrorMessages = {
  ["products/productFetchRequestFailed"]: "Failed to fetch products. Please try again later.",
  ["products/productCreateRequestFailed"]:
    "Something went wrong on the server. Product could not be created.",
  ["products/productUpdateRequestFailed"]:
    "Something went wrong on the server. Product couldn't be updated.",
  ["products/productDeleteRequestFailed"]:
    "Something went wrong on the server. Product could not be deleted.",
} as const;

export const generalErrorMessages = {
  somethingWentWrong: "Something went wrong.",
  pleaseTryAgainLater: "Please try again later.",
  serverError: "Server Error.",
};
