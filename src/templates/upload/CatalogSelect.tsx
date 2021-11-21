import React, { useEffect, useState } from "react";
import style from "./upload.module.scss";
import { Space } from "antd";
import Image from "next/image";
import CatalogAPI from "src/api/catalog";

export const CatalogSelect = ({
  setCate,
  isEmpty,
  setCatalogErrMsg
}) => {

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const chooseCate = (_id) => {
    setCategory(_id);
    setCate(_id);
  };

  useEffect(() => {
    CatalogAPI.getAllCatalog().then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <div className={`${style["category"]}`}>
      <div className={`${style["cate-title"]}`}>
        Category
      </div>

      <Space size={12} direction="horizontal">
        {categories.map((el, index) => {
          return (
            <div
              key={index}
              className={`${style["serie-btn"]} ${
                category === el.catalogId && style["active"]
              }`}
              onClick={() => {
                  chooseCate(el.catalogId);
                  setCatalogErrMsg(false);
              }}
            >
              <div
                className={`${style["radio-value"]}`}
                style={{
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                {el.nameCatalog}
                {category === el.catalogId && (
                  <div className={`${style["checked-icon"]}`}>
                    <Image
                      src="/assets/icons/checked.svg"
                      width={19}
                      height={19}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </Space>
      {isEmpty && category === "" && (
        <div className={`${style["error-msg"]}`}>Please choose a category</div>
      )}
    </div>
  );
};
