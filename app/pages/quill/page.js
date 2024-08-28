"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function Home() {
  const [content, setContent] = useState("");

  const saveContent = async () => {
    const res = await fetch("/api/saveContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: content }),
    });

    if (res.ok) {
      alert("Content saved successfully!");
      setContent("");
    } else {
      alert("Failed to save content.");
    }
  };

  return (
    <div>
      <h1>Quill 편집창</h1>
      <ReactQuill value={content} onChange={setContent} />
      <button onClick={saveContent}>저장하기</button>
    </div>
  );
}
