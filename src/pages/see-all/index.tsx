import { SubHeader } from "@components/sub-header";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SeeAllTemplate } from "src/templates/see-all";
import { Header } from "../../components/header";

const SeeAllPage = () => {
  
  const router = useRouter();
  const [param, setParam] = useState({ catalogId: null });
  const [catalog, setCatalog] = useState(null);

  useEffect(() => {
    router.query &&
      setParam({
        catalogId: router.query.catalog,
      });
  }, [router.query]);

  useEffect(() => {
    router.push({
      query: { catalog },
    });
  }, [catalog])

  return (
    <React.Fragment>
      <Header />
      <SubHeader
        selectedCate={catalog}
        setSelectedCate={setCatalog}
      />
      <div style={{ height: 50 }}></div>
      <SeeAllTemplate selectedCate={param.catalogId} />
    </React.Fragment>
  );
};

export default SeeAllPage;
