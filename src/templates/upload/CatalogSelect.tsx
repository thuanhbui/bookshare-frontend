import React, { useEffect, useState } from "react";
import style from "./upload.module.scss";
import { Space } from "antd";
import Image from "next/image";
import CatalogAPI from "src/api/catalog";

export const CatalogSelect = ({
  firstInit = true,
  setCate,
  currentCategory = "",
}) => {

  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);

  const chooseCate = (_id, name) => {
    setCategory(_id);
    setCate(_id);
  };

  useEffect(() => {
    if (currentCategory !== "") {
      categories.map((cate) => {
        if (currentCategory === cate._id) {
          chooseCate(cate._id, cate.name);
        }
      });
    }
  }, [currentCategory, categories]);

  useEffect(() => {
    // CategoriesAPI.getAllCategories().then((res) => {
    //   seCategories(res.categories);
    //   setSubcates(res.subCategories);
    // });
    CatalogAPI.getAllCatalog().then((res) => {
      setCategories(res.data);
    })
  }, []);

  return (
    <div className={`${style["category"]}`}>
      <div className={`${style["header"]}`}>Category</div>
      <div className={`${style["cate-title"]}`}>
        Choose 1 of 5 categories below
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
                if (currentCategory == "") {
                  chooseCate(el.catalogId, el.nameCatalog);
                }
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
                    <Image src="/assets/icons/checked.svg" width={19} height={19} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </Space>
      {!firstInit && category === "" && (
        <div className={`${style["error-msg"]}`}>Please choose a category</div>
      )}
    </div>
  );
};
