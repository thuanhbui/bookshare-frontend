import { Modal, Form, Input, Button } from "antd";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import style from "./edit-password.module.scss";

export const EditPasswordModal = ({ updateModalVisible }) => {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [isCurrentPasswordTyped, setIsCurrentPasswordTyped] = useState(false);
  const [isMatchCurrentPw, setMatchCurrentPw] = useState(false);

  const handleChangeCurrentPassword = (value) => {
    // const encryptedPrivateKey = JSON.parse(
    //   window.localStorage.userInfo
    // ).encryptedPrivateKey;

    // const privateKey = SymmetricDecrypt(encryptedPrivateKey, value);

    // if (typeof privateKey === "string" && privateKey.length > 0) {
    //   setMatchCurrentPw(true);
    // } else {
    //   setMatchCurrentPw(false);
    // }

    // setCurrentPassword(value);

    // setIsCurrentPasswordTyped(true);
  };

  const [newPassword, setNewPassword] = useState("");
  const [isNewPasswordTyped, setIsNewPasswordTyped] = useState(false);

  const handleChangeNewPassword = (value) => {
    setNewPassword(value);

    setIsNewPasswordTyped(true);

    validatePassword(value);
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordTyped, setIsConfirmPasswordTyped] = useState(false);

  const handleChangeConfirmPassword = (value) => {
    setIsConfirmPasswordTyped(true);

    setConfirmPassword(value);
  };

  const [passwordIsCorrect, setPasswordIsCorrect] = useState(false);

  const handlePasswordSubmit = () => {
    setPasswordIsCorrect(true);
  };

  const displayConfirmButton = () => {
    const pathName = router.pathname;

    switch (pathName) {
      case "/user/checkout":
        return "Continue payment";

      case "/user/account":
        return "Done"

      default:
        return "Done";
    }
  };

  const resetModalPassword = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsCurrentPasswordTyped(false);
    setIsNewPasswordTyped(false);
    setIsConfirmPasswordTyped(false);
    setPasswordIsCorrect(false);
  };

  const [passwordConvention, setPasswordConvention] = useState(false);

  const validatePassword = (value) => {
    value.length < 8 ||
    !RegExp(".*[A-Z].*").test(value) ||
    !RegExp(".*[a-z].*").test(value) ||
    !RegExp(".*\\d.*").test(value) ||
    value != value.normalize("NFD").replace(/[\u0300-\u036f]/g, "") ||
    /\s/.test(value)
      ? setPasswordConvention(false)
      : setPasswordConvention(true);
  };

  return (
    <Modal
      onOk={() => resetModalPassword()}
      visible={true}
      onCancel={() => {
        updateModalVisible(false);
        resetModalPassword();
      }}
      footer={null}
      closable={false}
      maskClosable={false}
    >
      <div className={`${style["modal-common"]}`}>
        {passwordIsCorrect ? (
          <div className={`${style["center-content"]}`}>
            <div className={`${style["success-icon"]}`}>
              <Image src="/icons/success.png" height={56} width={56} />
            </div>

            <div
              className={`${style["success-message"]}`}
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              Successfully changed password
            </div>

            <div
              className={`${style["footer-button"]} ${style["save-active"]}`}
              onClick={() => {
                updateModalVisible();
                resetModalPassword();
                window.location.reload();
              }}
            >
              {displayConfirmButton()}
            </div>
          </div>
        ) : (
          <>
            <div className={`${style["modal-header"]}`}>Change password</div>

            <Form layout="vertical">
              <Form.Item label="Current Password">
                <Input
                  value={currentPassword}
                  type="password"
                  onChange={(e) => handleChangeCurrentPassword(e.target.value)}
                />
              </Form.Item>

              {!isMatchCurrentPw && isCurrentPasswordTyped && (
                <div
                  className={`${style["edit-notify"]}`}
                  style={{ color: "#D13434" }}
                >
                  Please input correct password
                </div>
              )}

              <Form.Item label="New Password">
                <Input
                  value={newPassword}
                  type="password"
                  onChange={(e) => handleChangeNewPassword(e.target.value)}
                />
              </Form.Item>

              {isNewPasswordTyped &&
                (newPassword == "" ? (
                  <div
                    className={`${style["edit-notify"]}`}
                    style={{ color: "#D13434" }}
                  >
                    Please input new password
                  </div>
                ) : passwordConvention ? (
                  <></>
                ) : (
                  <div
                    className={`${style["edit-notify"]}`}
                    style={{ color: "#D13434" }}
                  >
                    Password must have at least 8 characters with 1 uppercase
                    letter, 1 lowercase letter and 1 number. No accented
                    character or space is allowed
                  </div>
                ))}

              <Form.Item label="Confirm new Password">
                <Input
                  value={confirmPassword}
                  type="password"
                  onChange={(e) => handleChangeConfirmPassword(e.target.value)}
                />
              </Form.Item>

              {isConfirmPasswordTyped &&
                (confirmPassword != "" ? (
                  confirmPassword == newPassword ? (
                    <></>
                  ) : (
                    <div
                      className={`${style["edit-notify"]}`}
                      style={{ color: "#D13434" }}
                    >
                      Password doesn’t match
                    </div>
                  )
                ) : (
                  <div
                    className={`${style["edit-notify"]}`}
                    style={{ color: "#D13434" }}
                  >
                    Please confirm new password
                  </div>
                ))}
            </Form>

            <div className={`${style["custom-modal-footer"]}`}>
              <div
                onClick={() => {
                  updateModalVisible();
                  resetModalPassword();
                }}
                className={`${style["footer-button"]} ${style["cancel"]}`}
              >
                Cancel
              </div>

              <Button
                onClick={() => handlePasswordSubmit()}
                disabled={
                  newPassword == "" ||
                  confirmPassword == "" ||
                  confirmPassword != newPassword ||
                  !passwordConvention ||
                  !isMatchCurrentPw
                }
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
