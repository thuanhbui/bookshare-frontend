import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/header";
import EpisodeTemplate from "src/templates/item";

const ItemPage = (props) => {
  const router = useRouter();
  const [param, setParam] = useState({ itemId: null });

  useEffect(() => {
    router.query &&
      setParam({
        itemId: router.query.itemId,
      });
  }, [router.isReady]);

  return (
    <React.Fragment>
      <Header />
      <EpisodeTemplate bookId={param.itemId} />
    </React.Fragment>
  );
};

export default ItemPage;
