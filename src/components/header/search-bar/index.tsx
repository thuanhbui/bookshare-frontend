import style from "./search-bar.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useRouter } from "next/router";

export const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // useEffect(() => {
  // 	if(router.isReady) {
  // 	  setSearch(router.query?.search);
  // 	}
  // }, [router])

  const onSearch = () => {
    router.push({
      pathname: "/",
      query: { ...router.query, search },
    });
  };

  return (
    <div className={`${style["searchbox-2"]}`}>
      <input
        placeholder="Search"
        type="text"
        value={search ?? ""}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
      />
      <Button onClick={() => onSearch()}>
        <SearchOutlined style={{color: '#ffffff', cursor: 'pointer'}}/>
      </Button>
    </div>
  );
};
