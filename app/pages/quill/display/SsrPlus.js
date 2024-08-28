import "react-quill/dist/quill.snow.css";
import probe from "probe-image-size";

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
  minHeight: "200px",
  backgroundRepeat: "no-repeat",
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

// Function to fetch image metadata using probe-image-size
async function getImageData(imageUrl) {
  const result = await probe(imageUrl);
  return {
    url: imageUrl,
    width: result.width,
    height: result.height,
  };
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
function ContentWrapper({ imageData, children }) {
  const style = {
    ...contentWrapperStyle,
    backgroundImage: `url(${imageData.url})`,
  };

  return (
    <div style={style}>
      {/* <p>
        Image Dimensions: {imageData.width} x {imageData.height}
      </p> */}
      {children}
    </div>
  );
}

// Main page component with SSR data fetching
export default async function Display() {
  let contentList = [];
  let imageData = null;
  let error = null;

  try {
    contentList = await getContent();
    imageData = await getImageData("https://picsum.photos/id/10/400/300");
  } catch (err) {
    error = err.message;
  }

  if (error) return <p>Error loading content: {error}</p>;

  return (
    <div style={{ display: "flex" }}>
      <ContentWrapper imageData={imageData}>
        <h1>Content SSR+ View #1</h1>
        <hr />
        <DisplayContent contentList={contentList} />
      </ContentWrapper>
    </div>
  );
}
