import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Header } from "@components/header";

const UploadPage = (props) => {
    const router = useRouter();
    const [param, setParam] = useState({ itemId: null });
    const [selectedCate, setSelectedCate] = useState("all");
  
    useEffect(() => {
      console.log("hahaha");
      
    }, [router.isReady]);
  
    return (
      <React.Fragment>
        <Header />
        <div style={{ height: 50 }}></div>
        {/* <EpisodeTemplate seriesId={param.seriesId} episodeId={param.episodeId} /> */}
        {/* <Footer /> */}
      </React.Fragment>
    );
  };
  
  export default UploadPage;