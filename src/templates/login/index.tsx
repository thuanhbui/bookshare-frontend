import React, { useState } from "react";
import { Input } from "@components/input";
// import UserAPI from "../../api/user";
// import {
//   SignMessage,
//   SymmetricDecrypt,
// } from "src/api/auth/service/auth-cryptography";
import Router, { useRouter } from "next/router";
import { Button, Row, Col } from "antd";
// import CustomerCartAPI from "../../api/customer/cart";
import { useSelector, useDispatch } from "react-redux";
import style from "./login.module.scss";
import input from "../../components/input/input.module.scss";
import UserAPI from "src/api/user";

const LoginTemplate = (props) => {
  const router = useRouter();

  //   const isFrom = localStorage.getItem("routeFromLoginModal");

  const [userName, setUserName] = useState("");

  const [password, setPassWord] = useState("");

  const [notification, setNotification] = useState("");

  const emailRule =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleLogin = () => {
    let username = userName.trim();
    let userInfo = {
      username: username,
      password: password,
    };

    UserAPI.login({ userInfo: userInfo })
      .then((res) => {
        const userInfo = res?.data;
        window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
        const path = window.localStorage.getItem("routeFromLoginModal");
        window.localStorage.removeItem("routeFromLoginModal");

        if (userInfo.role === "USER") {
          if (path) {
            router.push(path);
          } else router.push("/");
        } else router.push("/admin/homepage");
      })
      .catch((err) => {
        console.log(err);
        setNotification("Please check your username and password");
      });
  };

  return (
    <div className={`${style["container"]}`}>
      <div className={style["login-container"]}>
        <div className={style["signin-title"]}> Login to BookShare </div>
        <div>
          <label>Email address</label>
          <Input
            className={`${input["atn-input-custom"]} ${input["atn-input-login-form"]}  mrb-20px`}
            placeholder="Email Address"
            autoComplete="off"
            onChange={(e) => {
              setNotification("");
              setUserName(e.target.value);
            }}
            onPressEnter={handleLogin}
          />
          <div className={`${style["padding-height"]}`}></div>
          <label>Password</label>
          <Input
            className={`${input["atn-input-custom"]} ${input["atn-input-login-form"]}`}
            placeholder="Password"
            autoComplete="off"
            type="password"
            onChange={(e) => {
              setNotification("");
              setPassWord(e.target.value);
            }}
            onPressEnter={handleLogin}
          />
        </div>
        <div className={style["btn-forgot-pw"]}>
          <Button
            type="link"
            className={style["atn-btn-link-login"]}
            onClick={() => {
              Router.push("/forgot-password");
            }}
          >
            Forgot password?
          </Button>
        </div>

        <div className={style["login-form-error"]}>{notification}</div>

        <Row className={input["btn-controller"]}>
          <Col>
            <div
              className={style["atn-btn-register"]}
              onClick={() => router.push("/signup")}
            >
              Create new account
            </div>
          </Col>
          <Col className={style["btn-controller-login"]}>
            <button
              className={`${style["atn-btn-login"]} ${style["style.atn-btn-color-orange"]}`}
              onClick={handleLogin}
            >
              Next
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginTemplate;
