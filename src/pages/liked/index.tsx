import { SubHeader } from "@components/sub-header";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { LikedTemplate } from "src/templates/liked";
import { Header } from "../../components/header";

const SeeAllPage = () => {
  
  const router = useRouter();

  return (
    <React.Fragment>
      <Header />
      <div style={{ height: 50 }}></div>
      <LikedTemplate />
    </React.Fragment>
  );
};

export default SeeAllPage;
