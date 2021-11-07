import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/header";
import TestApi from "../../api/test";

const ItemPage = (props) => {
  const router = useRouter();
  const [param, setParam] = useState({ itemId: null });

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
      {/* <EpisodeTemplate seriesId={param.seriesId} episodeId={param.episodeId} /> */}
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default ItemPage;
