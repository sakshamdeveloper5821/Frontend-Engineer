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

const ContextProvider = createContext<{
  state: stateType;
  dispatch: React.Dispatch<actionType>;
} | null>(null);

const AuthProvider = (props: providerTypes) => {
  const { children } = props;
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <ContextProvider.Provider value={{ state, dispatch }}>
      {children}
    </ContextProvider.Provider>
  );
};

 export const useStore = () => {
  const context = useContext(ContextProvider);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
