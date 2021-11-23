import React from "react";
import { Modal, Button } from "antd";
import { useRouter } from "next/router";
import style from "./require-login.module.scss";

export const RequireLoginModal = ({ updateModalVisible, isFrom = "" }) => {
  const router = useRouter();

  const handleRoute = () => {
    localStorage.setItem("routeFromLoginModal", isFrom);
    router.push("/login");
  };
  return (
    <Modal
      visible={true}
      footer={null}
      closable={false}
      maskClosable={true}
      width={350}
      onCancel={() => updateModalVisible()}
    >
      <div className={`${style["modal-header"]}`}>
        Please log in to continue enjoy the web
      </div>
      <Button className={`${style["modal-btn"]}`} onClick={() => handleRoute()}>
        Login
      </Button>
      <Button
        className={`${style["modal-btn"]}`}
        onClick={() => router.push("/signup")}
      >
        Create a new account
      </Button>
    </Modal>
  );
};
