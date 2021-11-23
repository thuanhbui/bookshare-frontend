import style from "./account.module.scss";
import { Form, Input, Typography, Space, Image, Switch } from "antd";
import { useEffect, useState } from "react";
import { EditPasswordModal } from "@components/account-modal/EditUserPassword";
import { EditUsernameModal } from "@components/account-modal/EditUserName";
import { GetUserInfo } from "src/api/common";
import { useRouter } from "next/router";
export const AccountTemplate = () => {

  const router = useRouter();

  const [profile, setProfile] = useState({
    _id: "",
    email: "",
    username: "",
    displayName: "",
  });
  const [editPass, setEditPass] = useState(false);
  const [editUsername, setEditUsername] = useState(false);

  useEffect(() => {
    const userInfo = GetUserInfo();
    if (userInfo) {
      setProfile({
        ...profile,
        email: userInfo?.email,
        displayName: userInfo?.username,
      });
    } else {
      window.localStorage.setItem("routeFromLoginModal", router.asPath);
      router.push("/login");
    }
  }, []);

  return (
    <div className={`${style["account-container"]}`}>
      {editPass && <EditPasswordModal updateModalVisible={setEditPass} />}
      {editUsername && (
        <EditUsernameModal
          updateModalVisible={setEditUsername}
          currentUserName={profile?.displayName}
        />
      )}

      <div style={{ height: 50 }} />
      <div className={`${style["account-ctn"]}`}>
        <span className={`${style["account-header"]}`}>Account</span>
        <div className={`${style["account-main"]}`}>
          <div className={`${style["account-info"]}`}>
            <span className={`${style["title"]}`}>Account Information</span>
            <div className={`${style["info-form"]}`}>
              <Form layout={"vertical"}>
                <Form.Item
                  label={"Email address"}
                  name="email"
                  className={`${style["form-item"]}`}
                >
                  <Input
                    disabled
                    value={"abcxjz"}
                    placeholder={profile?.email}
                    className={`${style["input-item"]}`}
                  />
                </Form.Item>
                <Form.Item
                  label={"Username"}
                  className={`${style["form-item"]} form-item-username`}
                >
                  <Space>
                    <Form.Item
                      name="username"
                      rules={[
                        { required: true, message: "Username is required" },
                      ]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        disabled
                        placeholder={profile?.displayName}
                        className={`${style["input-item"]} ${style["bg-white"]} ${style["user-name"]}`}
                      />
                    </Form.Item>
                    <Typography.Link
                      className={`${style["edit-btn"]}`}
                      onClick={() => setEditUsername(true)}
                    >
                      Edit
                    </Typography.Link>
                  </Space>
                </Form.Item>
                <Form.Item
                  label={"Password"}
                  className={`${style["form-item"]}`}
                >
                  <Space>
                    <Form.Item
                      name="password"
                      rules={[
                        { required: true, message: "Password is required" },
                      ]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input.Password
                        defaultValue={`abcdefgh`}
                        disabled
                        placeholder="input placeholder"
                        visibilityToggle={false}
                        className={`${style["input-item"]} ${style["password"]} ${style["bg-white"]}`}
                      />
                    </Form.Item>
                    <Typography.Link
                      className={`${style["edit-btn"]}`}
                      onClick={() => setEditPass(true)}
                    >
                      Edit
                    </Typography.Link>
                  </Space>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
