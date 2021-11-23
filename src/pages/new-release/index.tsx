import { SubHeader } from "@components/sub-header";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NewReleaseTemplate } from "src/templates/new-release";
import { Header } from "../../components/header";

const NewReleasePage = () => {
  
  const router = useRouter();
  const [param, setParam] = useState({ catalogId: null });
  const [catalog, setCatalog] = useState("all");


  useEffect(() => {
    router.query &&
      setParam({
        catalogId: router.query.catalog,
      });
    console.log(router.query.catalog);
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
      <NewReleaseTemplate selectedCate={param.catalogId} />
    </React.Fragment>
  );
};

export default NewReleasePage;
