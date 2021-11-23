import React, { useState } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { useRouter } from "next/router";
import { RuleObject } from "rc-field-form/lib/interface";
import CustomerProfileAPI from "src/api/user";
import style from "./sign-up.module.scss";
import input from "../../components/input/input.module.scss";

const passwordConvention = {
  passwordConvention1: "At least 8 characters",
  passwordConvention2: "1 uppercase letter",
  passwordConvention3: "1 lowercase letter",
  passwordConvention4: "1 number",
  passwordConvention5: "No white space",
};

const SignUpTemplate = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const [passConvention, setPassConvention] = useState({
    pc1: false,
    pc2: false,
    pc3: false,
    pc4: false,
    pc5: false,
  });

  const [userNameValid, setUserNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [typeErrMsg, setShow] = useState("");
  const [clickSubmit, setClickSubmit] = useState(false);

  const [isUserExisted, setIsUserExisted] = useState(false);
  const [isEmailExisted, setIsEmailExisted] = useState(false);

  const handelUserOnChange = (value) => {
    setIsUserExisted(false);

    return CustomerProfileAPI.checkUsernameAvailable({ username: value })
      .then((response) => {
        setIsUserExisted(true);
        return true;
      })
      .catch((err) => {
        setIsUserExisted(false);
        return false;
      });
  };

  const handelEmailOnChange = (value) => {
    return CustomerProfileAPI.checkEmailExist({ email: value }).then(
      (response) => {
        const { isExisted } = response;
        setIsEmailExisted(isExisted);
        return isExisted;
      }
    );
  };

  const handelPasswordOnChange = (e) => {
    const { value } = e.target;
    validateCfPassword(confirmPassword, value);
    setPassword(value);
  };

  const handelConfirmPasswordOnChange = (e) => {
    const { value } = e.target;
    validateCfPassword(value, password);
    setConfirmPassword(value);
  };

  const handleRemember = (e) => {
    setRemember(e.target.checked);
  };

  const validateUsername = (value) => {
    if (value !== "") {
      return value.length <= 60;
    }
    return false;
  };

  const validateEmail = (value) => {
    if (value !== "") {
      const emailRule = new RegExp(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      setEmailValid(emailRule.test(value));
      return emailRule.test(value);
    }
    return false;
  };

  const validatePassword = (value) => {
    const newPassConvention = {
      ...passConvention,
      pc1: value.length >= 8,
      pc2: RegExp(".*[A-Z].*").test(value),
      pc3: RegExp(".*[a-z].*").test(value),
      pc4: RegExp(".*\\d.*").test(value),
      pc5: !RegExp(".*\\s.*").test(value),
    };
    setPassConvention(newPassConvention);
    return newPassConvention;
  };

  const validateCfPassword = (value1, value2) => {
    if (value1 !== value2) setConfirmPasswordValid(false);
    else setConfirmPasswordValid(true);
  };

  const removeExtraSpace = (str) => {
    return str.replace(/ +(?= )/g, "");
  };

  const PasswordErrorMsg = () => {
    const ulItem = Object.keys(passConvention).map((key, index) => (
      <li
        className={`${
          passConvention[key]
            ? style["message-valid"]
            : style["message-invalid"]
        }`}
        key={key}
      >
        {passwordConvention[`passwordConvention${index + 1}`]}
      </li>
    ));

    return (
      <div className={`${style["password-msg"]} ${style["err-msg"]}`}>
        {"Password must have at least"}
        <ul>{ulItem}</ul>
      </div>
    );
  };

  const handleSubmit = () => {
    setClickSubmit(true);
    setUserName(removeExtraSpace(userName));
    setLoading(true);

    const userInfo = {
      username: userName,
      password: password,
      email: email,
    };

    CustomerProfileAPI.createNewUser({ userInfo: userInfo }).then((res) => {
      console.log(res);
      setLoading(false);
      window.localStorage.setItem("userInfo", JSON.stringify(res.data));
      router.push("/");
    }).catch((err) => {
        window.alert("Cannot create new user!")
        setLoading(false);
    });
  };

  const validation = (
    rule: RuleObject,
    value: any,
    callback: (error?: string) => void
  ) => {
    if (remember) {
      return callback();
    }
    return callback("You must accept the Terms of Use and Privacy Policy");
  };

  return (
    <React.Fragment>
      <div className={style["container"]}>
        <div className={style["sign-up-container"]}>
          <div className={style["sign-up-header"]}>
            {"Create a new account"}
          </div>

          <Form layout="vertical">
            <Form.Item
              label={"User name"}
              name="username"
              validateTrigger={["onBlur", "onChange"]}
              rules={[
                {
                  validator: async (_, username) => {
                    if (username) {
                      username = username.replace(/ +(?= )/g, "").trim();
                      setUserName(username);
                      setUserNameValid(validateUsername(username));
                      if (!username) {
                        return Promise.reject(
                          new Error("Please input username")
                        );
                      }

                      if (username.length > 60) {
                        return Promise.reject(
                          new Error("Username must be 60 characters or fewer")
                        );
                      }

                      return handelUserOnChange(username).then((res) => {
                        if (res)
                          return Promise.reject(
                            new Error("The username already exists")
                          );
                      });
                    } else {
                      setUserName("");
                      setUserNameValid(false);
                      return Promise.reject(new Error("Please input username"));
                    }
                  },
                },
              ]}
            >
              <Input
                className={`${input["atn-input-custom"]} ${input["atn-input-login-form"]}`}
                value={userName}
                name="username"
                placeholder={"Username"}
                type="text"
                onBlur={() => setShow("username")}
                onFocus={() => setShow("username")}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={"Email address"}
              rules={[
                {
                  validator: async (_, email) => {
                    email = email.trim();
                    setEmail(email);
                    const emailValidate = validateEmail(email);

                    if (!email) {
                      return Promise.reject(
                        new Error("Please input Email address")
                      );
                    }

                    if (!emailValidate)
                      return Promise.reject(
                        new Error("Please enter a correct email address")
                      );

                    return handelEmailOnChange(email).then((res) => {
                      if (res)
                        return Promise.reject(
                          new Error("The email address already exists")
                        );
                    });
                  },
                },
              ]}
            >
              <Input
                className={`${input["atn-input-custom"]} ${input["atn-input-login-form"]}`}
                placeholder={"Your email address"}
                value={email}
                name="email"
                onFocus={() => setShow("email")}
                onBlur={() => {
                  setShow("email");
                }}
              />
            </Form.Item>
            <div className={style["position-relative"]}>
              {typeErrMsg === "password" && <PasswordErrorMsg />}

              <Form.Item
                name="password"
                label={"Create password"}
                rules={[
                  {
                    validator: async (_, password) => {
                      if (!password) {
                        return Promise.reject(
                          new Error("Please input password")
                        );
                      }

                      const validate = validatePassword(password);
                      if (
                        !validate.pc1 ||
                        !validate.pc2 ||
                        !validate.pc3 ||
                        !validate.pc4 ||
                        !validate.pc5
                      ) {
                        return Promise.reject(new Error(" "));
                      }
                    },
                  },
                ]}
              >
                <Input
                  placeholder={"Your password"}
                  type="password"
                  onChange={handelPasswordOnChange}
                  value={password}
                  name="password"
                  onBlur={() => setShow("")}
                  onFocus={() => setShow("password")}
                  className={`${
                    !passConvention && clickSubmit ? style["input-invalid"] : ""
                  }
                                        ${input["atn-input-custom"]} ${
                    input["atn-input-login-form"]
                  }
                                    `}
                />
              </Form.Item>
            </div>
            <Form.Item
              name="confirmPassword"
              label={"Confirm password"}
              dependencies={["password"]}
              rules={[
                {
                  validator: async (_, confirmPassword) => {
                    if (!confirmPassword) {
                      return Promise.reject(
                        new Error("Please confirm password")
                      );
                    }
                    if (confirmPassword !== password || !confirmPasswordValid) {
                      return Promise.reject(
                        new Error("Password doesn't match")
                      );
                    }
                  },
                },
              ]}
            >
              <Input
                placeholder={"Your password"}
                type="password"
                onChange={handelConfirmPasswordOnChange}
                value={confirmPassword}
                name="confirmPassword"
                onFocus={() => setShow("cfpassword")}
                onBlur={() => {
                  setShow("cfpassword");
                }}
                className={`${
                  !confirmPasswordValid && clickSubmit
                    ? style["input-invalid"]
                    : ""
                }
                                    ${input["atn-input-custom"]} ${
                  input["atn-input-login-form"]
                }
                                `}
              />
            </Form.Item>
            <Form.Item name="remember" rules={[{ validator: validation }]}>
              <Checkbox name="remember" onChange={handleRemember}>
                <span className={`${style["text-color-light-black"]}`}>
                  {"I agree to the "}
                  <span className={`${style["text-color-blue"]}`}>
                    {"Terms of Use"}
                  </span>{" "}
                  {"and"}{" "}
                  <span className={`${style["text-color-blue"]}`}>
                    {"Privacy Policy"}
                  </span>{" "}
                </span>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                loading={loading}
                htmlType="submit"
                className={`${style["create-account-btn"]} ${style["disable-select"]}`}
                disabled={
                  !userNameValid ||
                  isUserExisted ||
                  !emailValid ||
                  isEmailExisted ||
                  !passConvention.pc1 ||
                  !passConvention.pc2 ||
                  !passConvention.pc3 ||
                  !passConvention.pc4 ||
                  !passConvention.pc5 ||
                  !confirmPasswordValid ||
                  !password ||
                  !remember
                }
                onClick={() => {
                  handleSubmit();
                }}
              >
                Create a new account
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUpTemplate;
