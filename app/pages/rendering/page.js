import React from "react";
import Isr from "./isr/page";
import Csr from "./csr/page";
import Ssr from "./ssr/page";
import Ssg from "./ssg/page";

const page = () => {
  return (
    <div>
      rendering page!!
      <div
        style={{
          display: "flex",
          flexDirection: "row", //
          justifyContent: "space-around", // Evenly space components vertically
          alignItems: "flex-start", //
          // height: "100vh", // Full viewport height to demonstrate spacing
        }}
      >
        <div style={{ flex: 1, backgroundColor: "#FFCCCC", width: "100%" }}>
          <Csr />
        </div>
        <div style={{ flex: 1, backgroundColor: "#CCFFCC", width: "100%" }}>
          <Isr />
        </div>
        <div style={{ flex: 1, backgroundColor: "#CCCCFF", width: "100%" }}>
          <Ssg />
        </div>
        <div style={{ flex: 1, backgroundColor: "#FFFFCC", width: "100%" }}>
          <Ssr />
        </div>
      </div>
    </div>
  );
};

export default page;
