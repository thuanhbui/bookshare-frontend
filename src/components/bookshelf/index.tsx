import React, { useState, useEffect } from "react";
import style from "./list-item.module.scss";
import { useRouter } from "next/router";
import { SeeMoreNoResult } from "../no-result";
import { PageNavigation } from "../pagination";
import { ItemComponent } from "../item";
import UserAPI from "src/api/user";
import BookAPI from "src/api/book";
import { DeleteBookModal } from "@components/modal/DeleteBookModal";

export const BookShelf = ({ selectedCate }) => {
  const router = useRouter();

  const [totalProduct, setTotalProduct] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [page, setPage] = useState(1);
  const [dataListProducts, setDataListProducts] = useState(null);
  const [category, setCategory] = useState(router.query["category"]);
  const [modalType, setModalType] = useState("");
  const [deleteBookId, setDeleteBookId] = useState("");

  const [param, setParam] = useState({ search: null });

  useEffect(() => {
    router.isReady && setCategory(router.query.category);
  }, [router]);

  useEffect(() => {
    featDataListProducts(selectedCate, param.search);
  }, [category, page, selectedCate, itemsPerPage, param.search]);

  useEffect(() => {
    router.query &&
      setParam({
        search: router.query.search,
      });
  }, [router.query]);

  const featDataListProducts = (selectedCate, search) => {
    setIsLoading(true);
    UserAPI.getBookShelf()
      .then((res) => {
        console.log(res.data);
        const fullList = res.data;

        if (search) {
          const filtered = fullList.filter(
            (book) => book.title.toLowerCase().indexOf(search.toLowerCase()) > 0
          );
          setDataListProducts(
            filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage)
          );
          setTotalProduct(filtered.length);
          setIsLoading(false);
        } else {
          setDataListProducts(
            res?.data.slice((page - 1) * itemsPerPage, page * itemsPerPage)
          );
          setTotalProduct(res?.data?.length);
          setIsLoading(false);
        }
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
      <div className={`${style["list-series-tag"]}`}>My Bookshelf</div>
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
