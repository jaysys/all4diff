"use client"; // This is important for client-side rendering

import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

// Styles for content reset
const resetStyle = {
  all: "unset",
  display: "block",
  fontFamily: "initial",
  margin: 0,
  padding: 0,
  border: "none",
  background: "transparent",
};

// Styles for each content wrapper
const contentWrapperStyle = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "200px", // Adjust as needed for height
  backgroundRepeat: "no-repeat",
  borderRadius: "8px",
  padding: "20px",
  margin: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  color: "#000", // Ensure text is visible, adjust as needed
};

// Function to fetch content from the server
async function getContent() {
  const res = await fetch("http://localhost:3000/api/saveContent", {
    method: "GET",
    cache: "force-cache", // Use cache if available
  });

  if (!res.ok) {
    throw new Error("Failed to fetch content");
  }

  return res.json();
}

// Component to display content
function DisplayContent({ contentList = [] }) {
  return contentList.length > 0 ? (
    contentList.map((item) => (
      <div key={item.id} style={resetStyle}>
        <h2>Content ID: {item.id}</h2>
        <div dangerouslySetInnerHTML={{ __html: item.data }} />
        <hr />
      </div>
    ))
  ) : (
    <p>No content available</p>
  );
}

// Component to wrap content with background image
function ContentWrapper({ imageUrl, children }) {
  const style = {
    ...contentWrapperStyle,
    backgroundImage: `url(${imageUrl})`,
  };

  return <div style={style}>{children}</div>;
}

// Main page component
export default function Display() {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getContent();
        setContentList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading content: {error}</p>;

  // Example image URLs
  const imageUrl1 = "https://picsum.photos/id/10/400/300";
  const imageUrl2 = "https://picsum.photos/id/20/400/300";

  return (
    <div style={{ display: "flex" }}>
      <ContentWrapper imageUrl={imageUrl1}>
        <h1>Content CSR View #1</h1>
        <hr />
        <DisplayContent contentList={contentList} />
      </ContentWrapper>
      {/* <ContentWrapper imageUrl={imageUrl2}>
        <h1>Content CSR View #2</h1>
        <hr />
        <DisplayContent contentList={contentList} />
      </ContentWrapper> */}
    </div>
  );
}
