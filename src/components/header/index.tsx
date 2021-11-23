import React, { useEffect, useState } from "react";
import { Menu, Dropdown } from "antd";
import Router, { useRouter } from "next/router";
import Link from "next/link";
// import { GetUserInfo } from "src/api/auth";
import style from "./header.module.scss";
import {
  UserOutlined,
  HddOutlined,
  BookOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { SearchBar } from "./search-bar";

export const Header = () => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userInfo = window.localStorage.getItem("userInfo");
      if (userInfo) {
        setIsLogged(true);
      } else setIsLogged(false);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("userInfo");
    console.log(router.pathname);
    
    if (router.pathname !== "/") {
      router.push("/");
    } else location.reload();
  };

  const UserDropdownMenu = () => {
    return (
      <Menu className={`${style["dropdown-menu"]}`}>
        <Menu.Item onClick={() => router.push("/account")}>Account</Menu.Item>
        <Menu.Item>My Books</Menu.Item>
        <Menu.Item onClick={handleLogout}>Log out</Menu.Item>
      </Menu>
    );
  };

  const Signed = () => {
    return (
      <>
        <Menu.Item
          className={`${style["icon"]} ${style["disable-antd-css"]} ${style["ml-auto"]}`}
          onClick={() => {
            router.push("/bookshelf");
          }}
        >
          <HddOutlined />
        </Menu.Item>
        <Menu.Item
          className={`${style["icon"]} ${style["disable-antd-css"]}`}
          onClick={() => router.push("/upload")}
        >
          <PlusCircleOutlined />
        </Menu.Item>

        <Menu.Item className={`${style["icon"]} ${style["disable-antd-css"]}`}>
          <Dropdown
            overlay={UserDropdownMenu}
            trigger={["click"]}
            placement="bottomCenter"
          >
            <div>
              <UserOutlined />
            </div>
          </Dropdown>
        </Menu.Item>
      </>
    );
  };

  const UnSigned = () => {
    return (
      <>
        <Menu.Item
          className={`${style["icon"]} ${style["disable-antd-css"]} ${style["ml-auto"]}`}
          onClick={() => router.push("/login")}
        >
          Sign in
        </Menu.Item>
      </>
    );
  };

  return (
    <>
      <Menu mode="horizontal" className={`${style["header"]}`}>
        <Menu.Item
          className={`${style["bookshare"]} ${style["disable-antd-css"]}`}
        >
          <BookOutlined />
          <a href="/" style={{ color: "white" }}>
            BookShare
          </a>
        </Menu.Item>
        {isLogged ? <Signed /> : <UnSigned />}
      </Menu>
    </>
  );
};
