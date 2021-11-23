import { Header } from "@components/header";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { SubHeader } from "@components/sub-header";
import { TopHotBooks } from "@components/top-page/TopHotBooks";
import { TopByCatalog } from "@components/top-page/TopByCatalog";
import CatalogAPI from "src/api/catalog";
import { Footer } from "@components/footer";

const Home: React.FC<{ homepageContent: any }> = () => {
  const [selectedCate, setSelectedCate] = useState("all");
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
    console.log(router.query.search);
  }, [router.query]);

  return (
    <div>
      <Header />
      <SubHeader
        selectedCate={selectedCate}
        setSelectedCate={setSelectedCate}
      />
      <div style={{ height: 50 }}></div>
      <TopHotBooks />
      {categories.map((catalog, index) => {
        return <TopByCatalog catalogName={catalog.nameCatalog.toUpperCase()} search={param.search}/>;
      })}
      <Footer />
    </div>
  );
};

export default Home;
