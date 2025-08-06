import { Middleware } from "redux";

interface ActionWithPayload {
  type: string;
  payload?: any;
}

const resetDataMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action: unknown) => {
    // const typedAction = action as ActionWithPayload;
    // const initialAppState = getState();

    // if (  ) {
    //   const actionWithInitialAppState = {
    //     ...typedAction,
    //     payload: initialAppState,
    //   };
    //   return next(actionWithInitialAppState);
    // }

    return next(action);
  };

export default resetDataMiddleware;
