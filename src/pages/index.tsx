import { Header } from "@components/header";
import { ItemComponent } from "@components/item";
import { HomePage } from "../templates/homepage";
import React, { useEffect, useState, useRef } from "react";
import { SubHeader } from "@components/sub-header";
import { TopHotBooks } from "@components/top-page/TopHotBooks";
import { TopByCatalog } from "@components/top-page/TopByCatalog";
import CatalogAPI from "src/api/catalog";

const Home: React.FC<{ homepageContent: any }> = () => {
  const [selectedCate, setSelectedCate] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CatalogAPI.getAllCatalog().then((res) => {
      setCategories(res?.data);      
    });
  }, []);

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
        return <TopByCatalog catalogName={catalog.nameCatalog.toUpperCase()} />;
      })}
    </div>
  );
};

export default Home;
