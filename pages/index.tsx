import Head from "next/head";
import { Inter } from "@next/font/google";

export default function Home() {
  return (
    <>
      <Head>
        <title>Demo Api by Temka</title>
        <meta name="description" content="Demo api from temka" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="solar-syst">
          <div className="sun"></div>
          <div className="mercury"></div>
          <div className="venus"></div>
          <div className="earth"></div>
          <div className="mars"></div>
          <div className="jupiter"></div>
          <div className="saturn"></div>
          <div className="uranus"></div>
          <div className="neptune"></div>
          <div className="pluto"></div>
          <div className="asteroids-belt"></div>
        </div>
      </div>
    </>
  );
}
