import React, { useState, useEffect } from "react";
import style from "./list-item.module.scss";
import { useRouter } from "next/router";
import { SeeMoreNoResult } from "../no-result";
import { PageNavigation } from "../pagination";
import { ItemComponent } from "../item";

export const BookShelf = ({ selectedCate }) => {
  const router = useRouter();

  const [totalProduct, setTotalProduct] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [dataListProducts, setDataListProducts] = useState(null);
  const [category, setCategory] = useState(router.query["category"]);

  useEffect(() => {
    router.isReady && setCategory(router.query.category);
  }, [router]);

  useEffect(() => {
    featDataListProducts(selectedCate);
  }, [category, page, selectedCate, itemsPerPage]);

  const featDataListProducts = (selectedCate) => {
    setIsLoading(true);
    
    setDataListProducts(Array(20).fill(0).map((i, index) => ({id: index})));
    setTotalProduct(dataListProducts?.length);
    setIsLoading(false);

    // SeriesManagementAPI.getSerieQuery({
    //   userInfo: GetUserInfo(),
    //   limit: itemsPerPage,
    //   page: page,
    //   category: selectedCate,
    //   isDaily: "true",
    // })
    //   .then((res) => {
    //     console.log({ res })
    //     setDataListProducts(res.data);
    //     setTotalProduct(res.totalSeries);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setTotalProduct(0);
    //     setIsLoading(false);
    //   });
  };

  return (
    <div className={style["list-series-container"]} id="main-container">
      <div className={`${style["list-series-tag"]}`}>New Released</div>
      {!isLoading && totalProduct === 0 ? (
        <SeeMoreNoResult />
      ) : (
        <>
          <div className={`${style["list-series-content"]}`}>
            {!isLoading &&
              dataListProducts?.map((serie, index) => (
                <ItemComponent key={index} id={serie.id} />
              ))}
          </div>
          {!isLoading && totalProduct > itemsPerPage && (
            <PageNavigation
              page={page}
              setPage={setPage}
              totalItem={totalProduct}
              itemsPerPage={itemsPerPage}
            />
          )}
        </>
      )}
    </div>
  );
};
