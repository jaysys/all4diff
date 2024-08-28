import React from "react";
import PageSsr from "./Ssr";
import PageSsrPlus from "./SsrPlus";
import PageCsr from "./Csr";

function Main() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <PageCsr />
      <PageSsr />
      <PageSsrPlus />
    </div>
  );
}

export default Main;
