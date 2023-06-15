import React, { createContext, useReducer, useContext } from "react";

interface providerTypes {
  children: React.ReactNode;
}

interface stateType {
  user: null | {
    email: string
  };
  isLoggedIn: boolean;
  token: string;
}

interface actionType {
  type: string;
  payload?: any;
}

const initialState: stateType = {
  user: null,
  isLoggedIn: false,
  token: "",
};
// REDUCER FOR USE REDUCER TAKES STATE AND ACTION AS ITS PARAMETERS
const authReducer = (state: stateType = initialState, action: actionType) => {
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
//CONTEXT FOR PROVIDING STATE TO NESTED COMPONENTS
const ContextProvider = createContext<{
  state: stateType;
  dispatch: React.Dispatch<actionType>;
} | null>(null);
// AUTHPROVIDER COMPONENT FOR PROVIDING STATE TO CHILDREN TAKES CHILDREN AS ITS PROPS
const AuthProvider = (props: providerTypes) => {
  const { children } = props;
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <ContextProvider.Provider value={{ state, dispatch }}>
      {children}
    </ContextProvider.Provider>
  );
};
//useStore HOOK FOR GETTING STATE FROM CONTEXT
 export const useStore = () => {
  const context = useContext(ContextProvider);
  if (!context) {
    throw new Error("useStore must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
