import React from "react";
import PageSsr from "./Ssr";
import PageCsr from "./Csr";

function Main() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <PageSsr />
      <PageCsr />
    </div>
  );
}

export default Main;
