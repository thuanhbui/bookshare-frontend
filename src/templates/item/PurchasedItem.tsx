import { Col, Row, Button } from "antd";
import React, { useState, useEffect } from "react";
import style from "./item.module.scss";
import { useRouter } from "next/router";

export const PurchasedItem = ({
  episodeInfo = null,
  serieId = null,
}) => {
  const router = useRouter();

  const enjoyEpisode = ({ serieId, episodeId, type }) => {
    if(type == 'watch')
      router.push(`watch?serieId=${serieId}&episodeId=${episodeId}`);
    else router.push(`read?serieId=${serieId}&episodeId=${episodeId}`);
  };

  const AvailablePurchasedItem = () => {
    return (
      <>
        <Row gutter={15} className={`${style["available"]}`}>
          <>
            <Col span={12}>
              <Button
                className={`${style["available"]} ${style["btn-add-to-cart"]}`}
                onClick={() => {}}
              >
                Buy more
              </Button>
            </Col>
            <Col span={12}>
              <Button
                className={`${style["available"]} ${style["btn-buy-now"]}`}
                onClick={() => {
                  enjoyEpisode({ serieId: serieId, episodeId: episodeInfo.episodeId, type: episodeInfo.type });
                }}
              >
                Enjoy
              </Button>
            </Col>
          </>
        </Row>
      </>
    );
  };

  const SoldOutPurchasedItem = () => {
    return (
      <>
        <Row gutter={15} className={`${style["available"]}`}>
          <>
            <Col span={12}>
              <Button
                className={`${style["available"]} ${style["btn-buy-now"]}`}
                onClick={() => {
                  enjoyEpisode({ serieId: serieId, episodeId: episodeInfo.episodeId, type: episodeInfo.type });
                }}
              >
                Enjoy
              </Button>
            </Col>
          </>
        </Row>
      </>
    );
  };

  const FreePurchasedItem = () => {
    return (
      <>
        <Row gutter={15} className={`${style["available"]}`}>
          <>
            <Col span={11}>
              <Button
                disabled
                className={`${style["sold-out"]} ${style["btn-add-to-bookshelf"]}`}
              >
                Added to bookshelf
              </Button>
            </Col>
            <Col span={2}/>
            <Col span={11}>
              <Button
                className={`${style["available"]} ${style["btn-buy-now"]}`}
                onClick={() => {
                  enjoyEpisode({ serieId: serieId, episodeId: episodeInfo.episodeId, type: episodeInfo.type });
                }}
              >
                Enjoy
              </Button>
            </Col>
          </>
        </Row>
      </>
    );
  };

  return (
    <>
      <Row>
        <Col xs={24}>
            <div className={`${style["free"]}`}>{episodeInfo.price == 0 && "Free"}</div>
        </Col>
      </Row>

      {episodeInfo?.price == 0 ? <FreePurchasedItem /> : <SoldOutPurchasedItem />}

    </>
  );
};
