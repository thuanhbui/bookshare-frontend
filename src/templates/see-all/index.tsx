import React, { useState, useEffect } from "react";
import style from "../../components/bookshelf/list-item.module.scss";
import { useRouter } from "next/router";
import { SeeMoreNoResult } from "@components/no-result";
import { PageNavigation } from "@components/pagination";
import { ItemComponent } from "@components/item";
import BookAPI from "src/api/book";
import { DeleteBookModal } from "@components/modal/DeleteBookModal";
import { CatalogMappingName } from "src/constant/index";
import { RequireLoginModal } from "@components/require-modal";

export const SeeAllTemplate = ({ selectedCate }) => {
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
    router.query &&
      setParam({
        search: router.query.search,
      });
  }, [router.query]);


  useEffect(() => {
    featDataListProducts(selectedCate);
  }, [category, page, selectedCate, itemsPerPage]);

  const featDataListProducts = (selectedCate) => {

    setIsLoading(true);

    const catalogId = selectedCate ? selectedCate !== "all" ? selectedCate : "" : "";

    BookAPI.getHotBooksByCatalog({
      catalogId: catalogId,
      search: param.search ? param.search : "",
    })
      .then((res) => {
        setDataListProducts(res?.data.slice((page - 1) * itemsPerPage, page * itemsPerPage));
        setTotalProduct(res?.data.length);
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
      <div className={`${style["list-series-tag"]}`}>{CatalogMappingName[`${selectedCate}`]}</div>
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
      {modalType === "require-login" && (
        <RequireLoginModal isFrom={router.asPath} updateModalVisible={setModalType}/>
      )}
    </div>
  );
};
