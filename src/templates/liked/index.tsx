import React, { useState, useEffect } from "react";
import style from "@components/bookshelf/list-item.module.scss";
import { useRouter } from "next/router";
import { SeeMoreNoResult } from "@components/no-result";
import { PageNavigation } from "@components/pagination";
import { ItemComponent } from "@components/item";
import UserAPI from "src/api/user";
import BookAPI from "src/api/book";
import { DeleteBookModal } from "@components/modal/DeleteBookModal";
import { GetUserInfo } from "src/api/common";

export const LikedTemplate = ({ selectedCate }) => {
  const router = useRouter();

  const [totalProduct, setTotalProduct] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [page, setPage] = useState(1);
  const [dataListProducts, setDataListProducts] = useState(null);
  const [modalType, setModalType] = useState("");
  const [deleteBookId, setDeleteBookId] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const [param, setParam] = useState({ search: null });

  useEffect(() => {
    const userInfo = GetUserInfo();
    if (userInfo?.role !== "USER" || !userInfo) {
      window.localStorage.setItem("routeFromLoginModal", router.asPath);
      router.push("/login");
    } else {
      setIsLogged(true);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    isLogged && featDataListProducts(selectedCate, param.search, 1);
  }, [selectedCate, itemsPerPage, param.search]);

  useEffect(() => {
    isLogged && featDataListProducts(selectedCate, param.search, page);
  }, [page])

  useEffect(() => {
    router.query &&
      setParam({
        search: router.query.search,
      });
  }, [router.query]);

  const featDataListProducts = (selectedCate, search, page) => {
    setIsLoading(true);
    
    const catalogId =
      selectedCate !== "all"
        ? selectedCate
        : "";
    const searchKey = search ? search : "";

    UserAPI.getLikedBooks({
      userInfo: GetUserInfo(),
      // catalogId: catalogId,
      // search: searchKey,
    })
      .then((res) => {
        setDataListProducts(
          res?.data.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        );
        setTotalProduct(res?.data?.length);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setTotalProduct(0);
        setIsLoading(false);
      });
  };

  const handleDeleteBook = () => {
    BookAPI.deleteBook({ bookId: deleteBookId }).then((res) => {
      location.reload();
    });
  };

  return (
    <div className={style["list-series-container"]} id="main-container">
      <div className={`${style["list-series-tag"]}`}>My Liked Books</div>
      {!isLoading && totalProduct === 0 ? (
        <SeeMoreNoResult />
      ) : (
        <>
          <div className={`${style["list-series-content"]}`}>
            {!isLoading &&
              dataListProducts?.map((book, index) => (
                <ItemComponent
                  key={index}
                  id={book.bookId}
                  setModalType={setModalType}
                  setDeleteBookId={setDeleteBookId}
                />
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
      {modalType === "deleteBook" && (
        <DeleteBookModal
          updateModalVisible={setModalType}
          deleteBook={handleDeleteBook}
        />
      )}
    </div>
  );
};
