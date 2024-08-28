import React from "react";
import PageSsr from "./Ssr";
import PageSsrLazy from "./SsrLazyLoading";
import PageCsr from "./Csr";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function Main() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <PageCsr />
      <PageSsr />
      <PageSsrLazy />
    </div>
  );
}

export default Main;
