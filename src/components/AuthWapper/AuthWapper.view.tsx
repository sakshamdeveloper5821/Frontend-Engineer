import React from "react";
import { useStore } from "../../context";
import { useEffect, JSX } from "react";
import { useNavigate } from "react-router-dom";

interface wapperPropsType {
  children: JSX.Element | JSX.Element[];
}

function AuthWapper(props: wapperPropsType) {
  const { children } = props;
  const navigate = useNavigate();
  const store = useStore();

  useEffect(() => {
    const { state: {isLoggedIn} } = store;
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [store,navigate]);
  return <>{children}</>;
}

export default AuthWapper;
