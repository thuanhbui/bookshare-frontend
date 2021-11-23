import React from "react";
import { Button, Space } from "antd";
import { useRouter } from "next/router";
import style from "./footer.module.scss";

export const Footer = ({ isHide = false }) => {
  const router = useRouter();

  if (isHide) return <></>;

  return (
    <div className={`${style["atn-footer"]}`}>
      <Space direction="vertical" size="large">
        <Space align="center" size="middle">
          <div className={`${style["atn-footer-content"]}`}>
            <div
              className={`${style["atn-footer-link-container"]} ${style["atn-footer-text"]}`}
            >
              <Button
                type="link"
                className={`${style["link-text"]}`}
                key="teamInformation"
                href="/team-information"
                target={"_blank"}
              >
                Team Information
              </Button>

              <Button
                type="link"
                className={`${style["link-text"]}`}
                key="privacyPolicy"
                href="/privacy-policy"
                target={"_blank"}
              >
                Privacy Policy
              </Button>

              <Button
                type="link"
                className={`${style["link-text"]}`}
                key="support"
                href="/support"
                target={"_blank"}
              >
                Support
              </Button>

              <Button
                type="link"
                className={`${style["link-text"]}`}
                key="termsAndConditions"
                href="/terms-and-conditions"
                target={"_blank"}
              >
                Terms and Conditions
              </Button>
            </div>
            <span className={`${style["atn-footer-text"]}`}>
              Copyright ©︎ HT. All rights reserved.
            </span>
          </div>
        </Space>
      </Space>
    </div>
  );
};
