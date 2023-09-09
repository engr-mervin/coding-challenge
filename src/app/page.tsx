"use client";
import { useState, useEffect } from "react";
import { deepCopyWithCount } from "../../util/process-json";
import { URL_SAVE_DELAY } from "../../util/constants";

const Home = function () {
  const [originalResponse, setOriginalResponse] = useState<string>("");
  const [processedResponse, setProcessedResponse] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const getUrl = async function () {
    setDisabled(true);
    try {
      const response = await fetch("/api/url");
      const body = await response.json();
      setUrl(body.data[0].url);
    } catch (err) {
      setError(err as string);
    } finally {
      setDisabled(false);
    }
  };

  const saveUrl = async function () {
    try {
      const body = new FormData();
      body.append("url", url);
      await fetch("/api/url", {
        method: "POST",
        body,
      });
    } catch (err) {
      setError(err as string);
    }
  };

  useEffect(() => {
    getUrl();
  }, []);

  useEffect(() => {
    const saveRequest = setTimeout(() => {
      saveUrl();
    }, URL_SAVE_DELAY);

    return () => {
      clearTimeout(saveRequest);
    };
  }, [url]);

  const urlChangeHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setUrl(e.target.value);
  };

  const getOriginalResponse = async function (
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setOriginalResponse("");
    setProcessedResponse("");
    if (url === "") {
      setError("Please input a valid URL.");
      return;
    }

    setError("Loading...");

    const body = new FormData();
    body.append("query", url);
    try {
      const response = await fetch("/api/query", {
        method: "POST",
        body,
      });
      const json = await response.json();
      if (json.message !== "ok") {
        throw "The URL did not provide a JSON object in response.";
      }
      setOriginalResponse(JSON.stringify(json.original, null, 2));
      setProcessedResponse(JSON.stringify(json.processed, null, 2));
      setError("");
    } catch (err) {
      setError(err as string);
    }
  };

  return (
    <>
      <h1 className="title">Coding Challenge</h1>
      <form className="form" onSubmit={getOriginalResponse}>
        <label className="label--url" htmlFor="input--url">
          URL:
        </label>
        <input
          className="input--url"
          type="text"
          id="input--url"
          onChange={urlChangeHandler}
          value={url}
          disabled={disabled}
        />
        <button className="button--url" type="submit">
          Query
        </button>
      </form>
      <p className="error-text">{error}</p>
      <div className="response-box">
        {originalResponse ? (
          <div className="response-group">
            <h2 className="subtitle">URL Response</h2>
            <pre className="response-text">{originalResponse}</pre>
          </div>
        ) : (
          ""
        )}
        {processedResponse ? (
          <div className="response-group">
            <h2 className="subtitle">Processed URL Response</h2>
            <pre className="response-text">{processedResponse}</pre>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Home;
