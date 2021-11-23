import { LeftArrow } from "@components/arrows/left-arrow";
import { RightArrow } from "@components/arrows/right-arrow";
import style from "./list-layout.module.scss";
import { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { ItemComponent } from "@components/item";
import { SeeMoreNoResult } from "@components/no-result";
import BookAPI from "src/api/book";
import { CatalogMappingId } from "src/constant/index";

export const TopByCatalog = ({
  category = "all",
  search = "",
  catalogName,
}) => {
  const [data, setData] = useState(null);
  const itemWidth = 176;
  const [total, setTotal] = useState(0);
  const [width, setWidth] = useState(
    typeof window !== "undefined" && window.innerWidth
  );
  const [firstInit, setFirstInit] = useState(true);

  const router = useRouter();

  useLayoutEffect(() => {
    getNewReleaseSerie(category);
  }, [category, search]);

  const getNewReleaseSerie = (category = "all") => {

    BookAPI.getHotBooksByCatalog({
      catalogId: CatalogMappingId[`${catalogName}`],
    }).then((res) => {
      setData(res?.data);
      setTotal(res?.data.length);
    });
  };

  const moveRight = () => {
    const el = document.getElementById(catalogName);
    let distanceSrolled = el.scrollLeft % itemWidth;
    if (distanceSrolled === 0) el.scrollLeft += el.offsetWidth + 16;
    else el.scrollLeft += el.offsetWidth + 16 - distanceSrolled;
  };

  const moveLeft = () => {
    const el = document.getElementById(catalogName);
    let distanceSrolled = el.scrollLeft % itemWidth;
    if (distanceSrolled === 0) el.scrollLeft -= el.offsetWidth + 16;
    else el.scrollLeft -= el.offsetWidth + 16 - itemWidth + distanceSrolled;
  };

  const [arrowVisible, setArrowVisible] = useState(false);

  const handleArrowVisible = (id) => {
    const el = document.getElementById(id);
    if (el) {
      let isOverflow = el.clientWidth < el.scrollWidth;
      setArrowVisible(isOverflow);
    }
  };

  useEffect(() => {
    handleArrowVisible(catalogName);
  });

  const [arrowState, setArrowState] = useState("left");

  const onHorizontalScroll = (e) => {
    let element = e.target;
    handleArrowState(element);
  };

  const handleArrowState = (element) => {
    if (element.scrollLeft === 0) setArrowState("left");

    if (
      element.scrollLeft > 0 &&
      element.scrollWidth - element.scrollLeft > element.clientWidth
    )
      setArrowState("");

    if (element.scrollWidth - element.scrollLeft === element.clientWidth)
      setArrowState("right");
  };

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setFirstInit(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    const element = document.getElementById(catalogName);
    if (!firstInit) {
      handleArrowState(element);
    }
  }, [width]);

  return (
    <>
      <div
        className={`${style["list-series-header"]} ${style["new-list-series-header"]}`}
      >
        <span className={`${style["list-series-tag"]}`}>{`TOP ${catalogName} BOOKS`}</span>
        <span
          className={`${style["see-all-tag"]}`}
          onClick={() =>
            data &&
            total > 10 &&
            router.push(`/see-all?catalog=${CatalogMappingId[`${catalogName}`]}`)
          }
        >
          {data && total > 10 && "See All"}
        </span>
      </div>
      {(!data || total == 0) && <SeeMoreNoResult />}
      <div className={`${style["list-series-container"]}`}>
        {data && total > 0 && arrowVisible && (
          <LeftArrow
            className={"ml-auto"}
            arrowState={arrowState}
            onClick={() => moveLeft()}
          />
        )}
        <div
          className={`${style["list-series-content"]} ${
            !arrowVisible && style["m-auto"]
          }`}
          id={catalogName}
          onScroll={onHorizontalScroll}
        >
          {data?.map((serie, index) => (
            <ItemComponent
              id={serie?.bookId}
              classNames={`${index > 0 ? "ml-16" : ""}`}
            />
          ))}
        </div>
        {data && total > 0 && arrowVisible && (
          <RightArrow
            className={"mr-auto"}
            arrowState={arrowState}
            onClick={() => moveRight()}
          />
        )}
      </div>
    </>
  );
};
