export const buttonTypes = {
  dark: "dark",
  light: "light",
  text: "text",
  outlined: "outlined",
};

export type ButtonType = (typeof buttonTypes)[keyof typeof buttonTypes]; //'dark' || 'light' || ....
