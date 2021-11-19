import style from "./item.module.scss";
import React, { useEffect, useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useRouter } from "next/router";
import BookAPI from "../../api/book"

export const ItemComponent = ({ id = "", classNames = "" }) => {
  const router = useRouter();

  const [isLogged, setIsLogged] = useState(false);

  const [data, setData] = useState(null);
  
  const [favorite, setFavorite] = useState(data?.isFavorited);

  const convertLongString = (
    string: string,
    firstLength: number = 500,
    lastLength: number = 0
  ) => {
    if (!string) return "";
    if (string.length < firstLength) return string;
    return `${string.substr(0, firstLength)}...${string.substr(
      string.length - lastLength,
      string.length
    )}`;
  };

  useEffect(() => {
    setData({
      thumbnailSrc: "/mockup/item.jpg",
      serieName: 'This name',
      isFavorited: true,
    });

    BookAPI.getInfo(id).then((res) => {
      setData({...data,thumbnailSrc: "http://localhost:9001" + res?.data?.imageLink, serieName: res?.data?.title});
    }).catch((err) => {
      console.log(err);
    })

  }, []);

  const onClickFavorite = () => {
      setFavorite(!favorite);
    //call api to handle
  };

  const handleMoveToItem = () => {
    router.push(`/item?itemId=${id}`);
  };

  return (
    <>
      <div className={`${style["serie-component"]} ${style[classNames]}`}>
        <div className={`${style["cursor_pointer"]}`}>
          <img
            src={data?.thumbnailSrc}
            className={`${style["serie-image"]}`}
            onClick={handleMoveToItem}
          />
          <div
            className={`${style["cursor_pointer"]} ${style["bottom-detail"]} ${style["flex-end"]}`}
          >
            <Tooltip title={data?.serieName}>
              <div
                className={`${style["serie-name"]}`}
                onClick={handleMoveToItem}
              >
                {convertLongString(data?.serieName, 22)}
              </div>
            </Tooltip>

            <span className={`${style["float-right"]} ${style["serie-heart"]}`}>
              {favorite ? (
                <HeartFilled
                  className={`${style["favorite-icon"]} ${style["color-red"]}`}
                  onClick={onClickFavorite}
                />
              ) : (
                <HeartOutlined
                  className={`${style["favorite-icon"]}`}
                  onClick={onClickFavorite}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
