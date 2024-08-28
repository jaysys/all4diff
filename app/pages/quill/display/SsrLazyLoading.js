import "react-quill/dist/quill.snow.css";
import Image from "next/image";

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
  position: "relative",
  minHeight: "200px",
  borderRadius: "8px",
  padding: "20px",
  margin: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  color: "#000",
};

// Function to fetch content from the server
async function getContent() {
  const res = await fetch("http://localhost:3000/api/saveContent", {
    method: "GET",
    cache: "no-store", // Ensure fresh data for SSR
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

// Component to wrap content with an image
function ContentWrapper({ imageUrl, children }) {
  return (
    <div style={contentWrapperStyle}>
      <Image
        src={imageUrl}
        alt="Background Image"
        fill // Replaces `layout="fill"`
        style={{ objectFit: "cover" }} // Replaces `objectFit="cover"`
        quality={100} // Adjust the quality of the image
        // Removed placeholder property
      />

      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

// Main page component with SSR data fetching
export default async function Display() {
  let contentList = [];
  let error = null;

  try {
    contentList = await getContent();
  } catch (err) {
    error = err.message;
  }

  // Example image URLs
  const imageUrl1 = "https://picsum.photos/id/10/400/300";
  //const imageUrl1 = "https://www.changsaone.com/assets/img/visual_01.png";

  if (error) return <p>Error loading content: {error}</p>;

  return (
    <div style={{ display: "flex" }}>
      <ContentWrapper imageUrl={imageUrl1}>
        <h1>Content SSR Lazy #1</h1>
        <hr />
        <DisplayContent contentList={contentList} />
      </ContentWrapper>
    </div>
  );
}
