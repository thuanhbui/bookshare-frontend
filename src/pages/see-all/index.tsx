import { SubHeader } from "@components/sub-header";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SeeAllTemplate } from "src/templates/see-all";
import { Header } from "../../components/header";

const SeeAllPage = () => {
  
  const router = useRouter();
  const [param, setParam] = useState({ catalogId: null });
  const [selectedCate, setSelectedCate] = useState("all");


  useEffect(() => {
    router.query &&
      setParam({
        catalogId: router.query.catalog,
      });
    console.log(router.query.catalog);
  }, [router.isReady]);

  return (
    <React.Fragment>
      <Header />
      <SubHeader
        selectedCate={selectedCate}
        setSelectedCate={setSelectedCate}
      />
      <div style={{ height: 50 }}></div>
      <SeeAllTemplate selectedCate={param.catalogId} />
    </React.Fragment>
  );
};

export default SeeAllPage;
