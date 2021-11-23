import React, { useEffect } from "react";
import LoginTemplate from "../../templates/login";

const LoginPage = () => {
  useEffect(() => {
    window.localStorage.removeItem("userInfo");
  }, []);
  return <LoginTemplate />;
};

export default LoginPage;
