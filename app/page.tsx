'use client';
import Chart from "./components/Chart";
import Image from "next/image";
// import Comp from './components/test';
import LineChart from "./components/Chart";
import { useState } from "react";
import EurButton from "./components/EurButton";
import ZarButton from "./components/ZarButton";
export default  async function Home() {
  const [currency,setCurrency] = useState("ZAR");
  return (
    <>
    
    {/* <h2>{date}</h2> */}
    <EurButton toggle={()=>setCurrency("EUR")}></EurButton>
    <ZarButton toggle={()=>setCurrency("ZAR")}></ZarButton>

    <LineChart currency={currency}></LineChart>
    </>
    
  );
}
