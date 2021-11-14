import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Header } from "@components/header";
import TestApi from "../../api/test";
import { ListItems } from "@components/list-item";
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
    TestApi.firstTest().then((data) => {
      console.log(data);
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
      <ListItems selectedCate={selectedCate} />
      {/* <EpisodeTemplate seriesId={param.seriesId} episodeId={param.episodeId} /> */}
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default BookShelfPage;
