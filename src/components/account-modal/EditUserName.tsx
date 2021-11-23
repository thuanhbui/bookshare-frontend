import { Modal, Form, Input, Button } from "antd";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import style from "./edit-password.module.scss";
// import CustomerProfileAPI from "../../api/customer/profile";
// import { GetUserInfo } from "../../api/user";

export const EditUsernameModal = ({ updateModalVisible, currentUserName }) => {

  const router = useRouter();

  const [defaultUsername, setDefaultUsername] = useState(currentUserName);

  useEffect(() => {
    setDefaultUsername(currentUserName);
  }, [currentUserName]);

  const [currentUsername, setCurrentUsername] = useState(currentUserName);
  const [validUsername, setValidUsername] = useState(false);
  const [isNewUsernameTyped, setIsNewUsernameTyped] = useState(false);
  const [tooLongErr, setTooLongErr] = useState(false);
  const [blankErr, setBlankErr] = useState(false);

  const handleChangeCurrentUsername = (value) => {
    // const newUsername = value;
    // validateUsername(value);
    // setCurrentUsername(newUsername);
    // setIsNewUsernameTyped(true);
    // if (value.trim() == defaultUsername) setIsNewUsernameTyped(false);
    // value != "" &&
    //   CustomerProfileAPI.checkUsernameAvailable({ username: value.trim() }).then(
    //     (response) => {
    //       const { isAvailable } = response;

    //       setValidUsername(value !== defaultUsername ? isAvailable : true);
    //     }
    //   );
  };

  const [UsernameIsCorrect, setUsernameIsCorrect] = useState(false);

  const handleUsernameSubmit = (currentName) => {
    // if (validUsername && !tooLongErr && !blankErr) {
    //   CustomerProfileAPI.editUsername({
    //     userInfo: GetUserInfo(),
    //     username: currentName.replace(/ +(?= )/g, ""),
    //   });
    //   setUsernameIsCorrect(true);
    // } else setUsernameIsCorrect(false);
  };

  const resetModalUsername = () => {
    // router.push("/user/account");
  };

  const validateUsername = (value) => {
    const name = value.replace(/ +(?= )/g, "");
    setBlankErr(value.replace(/\s+/g, "") == "");
    if (name.length > 60) setTooLongErr(true);
    else setTooLongErr(false);
  };

  return (
    <Modal
      onOk={() => resetModalUsername()}
      visible={true}
      onCancel={() => {
        updateModalVisible(false);
        resetModalUsername();
      }}
      footer={null}
      closable={false}
      maskClosable={false}
      width={730}
    >
      <div className={`${style["modal-common"]} ${style["edit-username-box"]}`}>
        {UsernameIsCorrect ? (
          <div className={`${style["center-content"]}`}>
            <div className={`${style["success-icon"]}`}>
              <Image src="/icons/success.png" height={56} width={56} />
            </div>

            <div
              className={`${style["success-message"]}`}
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              Successfully changed username
            </div>

            <div
              className={`${style["footer-button"]} ${style["save-active"]}`}
              onClick={() => {
                updateModalVisible();
                resetModalUsername();
                window.location.reload();
              }}
            >
              OK
            </div>
          </div>
        ) : (
          <>
            <div className={`${style["modal-header"]}`}>
              {"Edit username"}
            </div>

            <Form layout="vertical">
              <Form.Item label={"Username"}>
                <Input
                  value={currentUsername}
                  onChange={(e) => handleChangeCurrentUsername(e.target.value)}
                  className={`${style["input-item"]}`}
                />
                <span
                  className={`${style["err-msg"]} ${
                    style[validUsername && !tooLongErr && !blankErr ? "valid-username" : ""]
                  }`}
                >
                  {!tooLongErr &&
                    !blankErr &&
                    isNewUsernameTyped &&
                      !validUsername
                        ? "Username already exists"
                        : "You may use this nickname"
                    }
                  {tooLongErr && "Maximum 60 characters"}
                  {blankErr && "Please input username"}
                </span>
              </Form.Item>
            </Form>

            <div
              className={`${style["custom-modal-footer"]} ${style["edit-user-footer"]}`}
            >
              <div
                onClick={() => {
                  updateModalVisible();
                  resetModalUsername();
                }}
                className={`${style["footer-button"]} ${style["cancel"]}`}
              >
                Cancel
              </div>

              <Button
                onClick={() => handleUsernameSubmit(currentUsername)}
                disabled={!isNewUsernameTyped || tooLongErr || blankErr}
                className={`${style["footer-button"]} ${style["save-active"]}`}
              >
                Save
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
