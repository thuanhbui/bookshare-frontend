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

const _convertCartList = (cartInfo) =>
  cartInfo
    .filter((e) => e.quantity > 0)
    .map((each: any) => ({
      episode: each.episode,
      quantity: each.quantity,
      price: each.price,
      cartItemId: each.episode._id,
      isCheck: each.isCheck,
    }));

const _combineItemInfo = (item1, item2) => {
  if (!item1 && item2) return item2;

  if (item1 && !item2) return item1;

  if (item1.cartItemId !== item2.cartItemId) return null;

  const totalQuantity = item1.numberEdition + item2.numberEdition;

  return {
    ...item1,
    ...item2,
    numberEdition:
      totalQuantity < item1.remainEdition ? totalQuantity : item1.remainEdition,
  };
};

const _combineCart = (cartList1, cartList2) => {
  if (!Array.isArray(cartList1) || !Array.isArray(cartList2)) return [];

  const combineCartList = [...cartList1, ...cartList2.reverse()];

  const distinctItemId = [
    ...new Set(combineCartList.map((item) => item.cartItemId)),
  ];

  return distinctItemId.map((itemId) => {
    const itemInCartList1 =
      cartList1.length > 0
        ? cartList1.find((e) => e.cartItemId === itemId)
        : null;

    const itemInCartList2 =
      cartList2.length > 0
        ? cartList2.find((e) => e.cartItemId === itemId)
        : null;

    return _combineItemInfo(itemInCartList1, itemInCartList2);
  });
};

const LoginTemplate = (props) => {

//   const storedCart = useSelector((state: any) => {
//     return state.cart.cartList;
//   });

  const router = useRouter();

//   const isFrom = localStorage.getItem("routeFromLoginModal");

  const [userName, setUserName] = useState("");

  const [password, setPassWord] = useState("");

  const [notification, setNotification] = useState("");

//   const dispatch = useDispatch();

  const emailRule =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleLogin = () => {
    let username = userName.trim();
    if (!username.match(emailRule) || password.length < 6) {
      setNotification(
        !username.match(emailRule)
          ? "Please check your email"
          : "Please check your email and password"
      );
      return;
    }
    // UserAPI.credential({ username })
    //   .then((response) => {
    //     const {
    //       encryptedPrivateKey,
    //       publicKey,
    //       _id,
    //       isEmailAuthenEnable,
    //       isGoogleAuthenEnable,
    //       email,
    //     } = response;
    //     if (
    //       typeof encryptedPrivateKey !== "string" ||
    //       encryptedPrivateKey.length <= 0
    //     ) {
    //       setNotification("Hãy kiểm tra lại email và mật khẩu");
    //       return;
    //     }
    //     const privateKey = SymmetricDecrypt(encryptedPrivateKey, password);
    //     if (!privateKey) {
    //       setNotification("Hãy kiểm tra lại email và mật khẩu");
    //       return;
    //     }
    //     setIsEmailAuth(isEmailAuthenEnable);
    //     setIsGoogleAuth(isGoogleAuthenEnable);
    //     const certificateInfo = {
    //       username,
    //       timestamp: new Date().toISOString(),
    //       exp: 3600000,
    //     };
    //     const signature = SignMessage(privateKey, certificateInfo);
    //     const authorizationHeader = {
    //       signature,
    //       certificateInfo,
    //       publicKey,
    //     };

    //     const userInfo = {
    //       username,
    //       email,
    //       _privateKey: privateKey,
    //       _id,
    //       _certificate: authorizationHeader,
    //     };

    //     setUserInformation(userInfo);

    //     if (isEmailAuthenEnable) setVisibleVerifyEmail(true);
    //     else if (isGoogleAuthenEnable) setVisibleVerifyGGAuth(true);
    //     else ping(userInfo);
    //   })
    //   .catch((err) => {
    //     if (err.message === "Network Error") {
    //       setNotification(
    //         navigator.onLine
    //           ? "Máy chủ không hoạt động. Vui lòng thử lại sau!"
    //           : "Hãy kiểm tra lại kết nối mạng!"
    //       );
    //     } else setNotification("Hãy kiểm tra lại email và mật khẩu");
    //   });
  };

//   const ping = (_userInfor, emailSignature = "", googleSignature = "") => {
//     const certificateInfo = {
//       username: _userInfor["username"],
//       timestamp: new Date().toISOString(),
//       exp: 3600000,
//       emailSignature,
//       googleSignature,
//     };

//     const signature = SignMessage(_userInfor["_privateKey"], certificateInfo);

//     const authorizationHeader = {
//       signature,
//       certificateInfo,
//       publicKey: _userInfor["_certificate"]["publicKey"],
//     };

//     const _userInformation = {
//       username: userName.trim(),
//       _privateKey: _userInfor["_privateKey"],
//       _id: _userInfor["_id"],
//       _certificate: authorizationHeader,
//     };

//     UserAPI.pingv2({
//       data: _userInformation["_certificate"],
//       userInfo: _userInformation,
//     })
//       .then(async (response) => {
//         const data = response;

//         if (!data) {
//           Router.reload();
//         }

//         if (data.role?.role === "customer") {
//           const { cartItems = [] } = await CustomerCartAPI.getCart({
//             userInfo: _userInformation,
//           });

//           const cartInfo = _combineCart(
//             _convertCartList(cartItems),
//             _convertCartList(storedCart)
//           );

//           await CustomerCartAPI.updateCartMutiple({
//             userInfo: _userInformation,
//             cartInfo: cartInfo.map((e) => ({
//               episodeId: e.cartItemId,
//               quantity: e.quantity,
//               isCheck: e.isCheck,
//             })),
//           })
//             .then(() => {
//               dispatch({
//                 type: "UPDATE_CART",
//                 payload: cartInfo,
//               });
//             })
//             .catch(() => {
//               dispatch({
//                 type: "UPDATE_CART",
//                 payload: _convertCartList(cartItems),
//               });
//             });
//         }

//         window.localStorage.setItem(
//           "userInfo",
//           JSON.stringify({
//             ...data,
//             _privateKey: _userInformation["_privateKey"],
//             _certificate: _userInformation["_certificate"],
//           })
//         );

//         if (window.localStorage.getItem("nftRem")) {
//           Router.push(window.localStorage.getItem("nftRem"));
//           window.localStorage.removeItem("nftRem");
//         } else {
//           if (isFrom && isFrom !== "") Router.push(`${isFrom}`);
//           else
//             Router.push(`/${data.role?.role === "creator" ? "?page=1" : ""}`);
//           localStorage.removeItem("routeFromLoginModal");
//         }
//       })
//       .catch((err) => {
//         setNotification("Hãy kiểm tra lại email và mật khẩu");
//       });
//   };

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
            <Button
              className={`${style["atn-btn-login"]} ${style["style.atn-btn-color-orange"]}`}
              onClick={handleLogin}
            >
              Next
            </Button>
          </Col>
        </Row>

      </div>
    </div>
  );
};

export default LoginTemplate;
