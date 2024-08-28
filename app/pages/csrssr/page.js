import React from "react";
import dynamic from "next/dynamic";
import SsrComponent from "./SsrComponent";

// Dynamically import the CSR component to ensure it is only rendered on the client side
const CsrComponent = dynamic(() => import("./CsrComponent"), { ssr: false });

const Page = () => {
  return (
    <div>
      <h1>CSR and SSR Example</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <CsrComponent />
        <SsrComponent />
      </div>
    </div>
  );
};

export default Page;
