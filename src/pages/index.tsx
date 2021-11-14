import { Header } from '@components/header'
import { ItemComponent } from '@components/item'
import { HomePage } from '../templates/homepage'
import React, { useEffect, useState, useRef } from "react";
import { SubHeader } from '@components/sub-header';
import { ListItems } from '@components/list-item';
import { TopHotBooks } from '@components/top-page/TopHotBooks';


const Home: React.FC<{ homepageContent: any }> = () => {

  const [selectedCate, setSelectedCate] = useState("all");

  return (
    <div>
      <Header/>
      <SubHeader selectedCate={selectedCate}
                            setSelectedCate={setSelectedCate} />
      <div style={{height: 50}}></div>
      <TopHotBooks/>
    </div>
  )
}

export default Home
