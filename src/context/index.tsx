import { createContext, JSX, useReducer, useContext } from "react";

interface providerTypes {
  children: JSX.Element | JSX.Element[];
}

interface initialStateTypes {
  user: null | string;
  isLoggedIn: boolean;
  token: string;
}

const initialState: initialStateTypes = {
  user: null,
  isLoggedIn: false,
  token: "",
};

const authReducer = (state: initialStateTypes = initialState, action: any) => {
  switch (action.type) {
    case "LOGGIN":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

const ContextProvider = createContext<any>(null);

const Provider = (props: providerTypes) => {
  const { children } = props;
  return (
    <ContextProvider.Provider value={useReducer(authReducer, initialState)}>
      {children}
    </ContextProvider.Provider>
  );
};

export const useStore = () => useContext(ContextProvider);

export default Provider;
