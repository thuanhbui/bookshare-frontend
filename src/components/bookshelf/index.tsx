import React, { useState, useEffect } from "react";
import style from "./list-item.module.scss";
import { useRouter } from "next/router";
import { SeeMoreNoResult } from "../no-result";
import { PageNavigation } from "../pagination";
import { ItemComponent } from "../item";
import UserAPI from "../../api/user";

export const BookShelf = ({ selectedCate }) => {
  const router = useRouter();

  const [totalProduct, setTotalProduct] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(24);
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
    UserAPI.getBookShelf()
      .then((res) => {
        console.log(res.data)
        setDataListProducts(res?.data.slice((page-1) * itemsPerPage, page * itemsPerPage));
        setTotalProduct(res?.data?.length);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setTotalProduct(0);
        setIsLoading(false);
      });
  };

  return (
    <div className={style["list-series-container"]} id="main-container">
      <div className={`${style["list-series-tag"]}`}>My Bookshelf</div>
      {!isLoading && totalProduct === 0 ? (
        <SeeMoreNoResult />
      ) : (
        <>
          <div className={`${style["list-series-content"]}`}>
            {!isLoading &&
              dataListProducts?.map((book, index) => (
                <ItemComponent key={index} id={book.bookId} />
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
