import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Header } from "@components/header";
import TestApi from "src/api/test";
import { BookShelf } from "@components/bookshelf";
import { SubHeader } from "@components/sub-header";

const BookShelfPage = (props) => {
  const router = useRouter();
  const [param, setParam] = useState({ itemId: null });
  const [selectedCate, setSelectedCate] = useState("all");

  useEffect(() => {
    router.query &&
      setParam({
        itemId: router.query.itemId,
      });
  }, [router.isReady]);

  return (
    <React.Fragment>
      <Header />
      <SubHeader
        selectedCate={selectedCate}
        setSelectedCate={setSelectedCate}
      />
      <div style={{ height: 50 }}></div>
      <BookShelf selectedCate={selectedCate} />
    </React.Fragment>
  );
};

export default BookShelfPage;
