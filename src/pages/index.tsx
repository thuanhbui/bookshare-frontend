import { Header } from "@components/header";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { SubHeader } from "@components/sub-header";
import { NewReleaseBooks } from "@components/top-page/NewReleaseBooks";
import { TopByCatalog } from "@components/top-page/TopByCatalog";
import CatalogAPI from "src/api/catalog";
import { Footer } from "@components/footer";

const Home: React.FC<{ homepageContent: any }> = () => {
  const [categories, setCategories] = useState([]);
  const [param, setParam] = useState({ search: null });

  const router = useRouter();

  useEffect(() => {
    CatalogAPI.getAllCatalog().then((res) => {
      setCategories(res?.data);
    });
  }, []);

  useEffect(() => {
    router.query &&
      setParam({
        search: router.query.search,
      });
  }, [router.query]);

  return (
    <div>
      <Header />
      <div style={{ height: 50 }}></div>
      <NewReleaseBooks />
      {categories.map((catalog, index) => {
        return <TopByCatalog catalogName={catalog.nameCatalog.toUpperCase()} search={param.search}/>;
      })}
      <div style={{ height: 100 }}></div>
      <Footer />
    </div>
  );
};

export default Home;
