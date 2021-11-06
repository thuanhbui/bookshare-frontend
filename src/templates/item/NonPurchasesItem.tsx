import { Col, Row, Button } from "antd";
import React from "react";
// import { useTranslation } from "next-i18next";
import style from "./item.module.scss";
import { useRouter } from "next/router";
// import { GetUserInfo } from "src/api/auth";

export const NonPurchasedItem = ({ episodeInfo = null, amountInCart = 0, addedToBookshelf = null, handelAddToBookshelf = null, handleAddToCart = null, serieId = null }) => {
  const router = useRouter();

  return (
    <>
      <Row>
        <Col xs={24}>
          {episodeInfo?.price == 0 ? (
            <div className={`${style["free"]}`}>Free</div>
          ) : (
            <div className={`${style["price"]}`}>
              <span>
                {episodeInfo?.price} USD
              </span>
            </div>
          )}
        </Col>
      </Row>

      {episodeInfo?.price == 0 ? (
        <Row gutter={15} className={`${style["available"]}`}>
          <>
            <Col span={11}>
              <Button
                disabled={addedToBookshelf}
                className={
                  !addedToBookshelf
                    ? `${style["available"]} ${style["btn-add-to-cart"]}`
                    : `${style["sold-out"]} ${style["btn-add-to-bookshelf"]}`
                }
                onClick={handelAddToBookshelf}
              >
                {addedToBookshelf
                  ? "Added to Bookshelf"
                  : "Add to Bookshelf"}
              </Button>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Button
                className={`${style["available"]} ${style["btn-buy-now"]}`}
                onClick={() => { }}
              >
                Enjoy
              </Button>
            </Col>{" "}
          </>
        </Row>
      ) : (
        <Row
          gutter={15}
          className={`${style["available"]}`}
        >
          <>
            <Col span={11}>
              <Button
                className={
                  amountInCart < 1
                    ? `${style["available"]} ${style["btn-add-to-cart"]}`
                    : `${style["sold-out"]} ${style["btn-add-to-cart"]}`}
                disabled={amountInCart > 0}
                onClick={() => handleAddToCart()}
              >
                Add to cart
              </Button>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <Button
                // onClick={() => {
                //   const userInfo = GetUserInfo();
                //   handleAddToCart();
                //   if (userInfo["encryptedPrivateKey"] && userInfo["publicKey"]) {
                //     router.push("/user/cart");
                //   } else {
                //     router.push("/login");
                //   }
                // }}
                className={`${style["available"]} ${style["btn-buy-now"]}`}
              >
                Buy now
              </Button>
            </Col>
          </>
        </Row>
      )}
    </>
  );
};
