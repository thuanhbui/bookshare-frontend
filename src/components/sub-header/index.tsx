import React, { useEffect, useState } from "react";
import { SearchBar } from "../header/search-bar";
import { Menu } from "antd";
import style from "./sub-header.module.scss";
import CatalogAPI from "src/api/catalog";

export const SubHeader = ({
  selectedCate,
  setSelectedCate,
  categoryId = null,
}) => {
  const [categories, setCategories] = useState([]);

  //   const getKeyByValue = async (object, value) => {
  //     const result = await Object.keys(object).find((key) => {
  //       return (
  //         object[key].filter((ele) => {
  //           return ele._id == value;
  //         }).length > 0
  //       );
  //     });
  //     return result || "all";
  //   };

  useEffect(() => {

    CatalogAPI.getAllCatalog().then((res) => {
      setCategories(res?.data);     
    });
  }, []);

  // useMemo(async () => {
  //   if (categoryId) {
  //     console.log(categoryId)
  //     if (categories.filter(cate => cate._id == categoryId).length > 0) {
  //       console.log({ categoryId });
  //       setSelectedCate(categoryId)
  //     } else {
  //       const parentId = await getKeyByValue(subCategories, categoryId)
  //       console.log({ parentId, categoryId });
  //       if (parentId && parentId !== 'all' && categoryId) {
  //         setSelectedCate(parentId)
  //       }
  //     }
  //   }
  // }, [categoryId, categories])

  return (
    <>
      <div className={`${style["subheader-container"]}`}>
        <Menu
          mode="horizontal"
          className={`${style["sub-header-1"]} ${style["sub-header-b"]}`}
        >
          <Menu.Item
            className={`${style["sub-item"]} ${style["text-uppercase"]} ${
              style["sub-hd-item"]
            } ${selectedCate == "all" && style["active-item"]} ${
              style["all-category"]
            }`}
            key="all-category"
            onClick={() => {
              setSelectedCate("all");
            }}
          >
            All
          </Menu.Item>

          {categories.map((cate) => {
            return (
              <Menu.Item
                className={`${
                  selectedCate == cate.catalogId && style["active-item"]
                } ${style["sub-item"]} ${style["text-uppercase"]} ${
                  style["sub-hd-item"]
                }`}
                key={cate.catalogId}
                onClick={() => {
                  setSelectedCate(cate.catalogId);
                }}
              >
                {cate.nameCatalog}
              </Menu.Item>
            );
          })}
        </Menu>
        <div className={`${style["search-box"]} ${style["ml-auto"]}`}>
          <SearchBar />
        </div>
      </div>
    </>
  );
};
