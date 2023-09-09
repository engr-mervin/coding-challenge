"use client";
import { useState } from "react";

const placeholderOrig = JSON.stringify(
  {
    found: 1,
    totalNumPages: 1,
    pageNum: 1,
    results: [
      {
        SEARCHVAL: "640 ROWELL ROAD SINGAPORE 200640",
        BLK_NO: "640",
        ROAD_NAME: "ROWELL ROAD",
        BUILDING: "NIL",
        ADDRESS: "640 ROWELL ROAD SINGAPORE 200640",
        POSTAL: "200640",
        X: "30381.1007417506",
        Y: "32195.1006872542",
        LATITUDE: "1.30743547948389",
        LONGITUDE: "103.854713903431",
      },
    ],
  },
  null,
  2
);

const placeholderProcessed = JSON.stringify(
  {
    objectCount: 4,
    uonfd: 1,
    uttsomlgeaaPN: 1,
    upmgeaN: 1,
    utssrle: [
      {
        objectCount: 10,
        VSRLHECAA: "WSRRRPOOONLLIGEEDAA664420000    ",
        _ONLKB: "640",
        _RONMEDAA: "WRROOLLEDA ",
        UNLIIGDB: "NLI",
        SSREDDA: "WSRRRPOOONLLIGEEDAA664420000    ",
        TSPOLA: "642000",
        X: "877654331110000.",
        Y: "987655432221100.",
        UTTLIEDA: "998877544433310.",
        UTONLIGED: "987544333311100.",
      },
    ],
  },
  null,
  2
);

const Home = function () {
  const [originalResponse, setOriginalResponse] = useState<string>("");
  const [processedResponse, setProcessedResponse] = useState<string>("");
  return (
    <>
      <h1>Coding Challenge</h1>
      <form>
        <label htmlFor="input--url">URL:</label>
        <input type="text" id="input--url" />
        <button type="submit">Query</button>
      </form>

      <div>
        <pre>{placeholderOrig}</pre>
        <pre>{placeholderProcessed}</pre>
      </div>
    </>
  );
};

export default Home;
