# 리액트 렌더링 4가지 방식 비교해보기

```
npm run dev
```

## case.1 csr/ssr/isr/ssg

http://localhost:3000/pages/rendering

## case.2 csr vs. ssr diff using mockserver http://xxxx.mockapi.io

http://localhost:3000/pages/csrssr

```
//csr
"use client";

import React, { useEffect, useState } from "react";

function CsrComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data on the client side after the component mounts
    fetch("https://66cc88b9a4dd3c8a71b7f996.mockapi.io/users")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>CSR Component</h2>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.id} | {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CsrComponent;
```

```
//ssr
import React from "react";

async function SsrComponent() {
  // Fetch data on the server side
  const res = await fetch("https://66cc88b9a4dd3c8a71b7f996.mockapi.io/users", {
    cache: "no-store", // Ensure the data is fetched freshly on each request
  });
  const data = await res.json();

  return (
    <div>
      <h2>SSR Component</h2>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.id} | {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SsrComponent;

```

---

# reqact quill

#### demo

```
npm install sqlite sqlite
npm install react-quill
```

http://localhost:3000/pages/quill/display

http://localhost:3000/pages/quill

---

you should avoid using `createImageBitmap` on the server and instead use another method to retrieve image metadata. For example, you could fetch the image dimensions using an external library like `image-size` or `probe-image-size` on the server side.

### Using `probe-image-size` for Fetching Image Metadata

Here's how you can modify your code to use `probe-image-size`, which is compatible with Node.js:

1. **Install the `probe-image-size` package**:

   - Run the following command in your project:
     ```bash
     npm install probe-image-size
     ```

2. **Refactor Your Code**:
   - Replace the `createImageBitmap` logic with `probe-image-size` to get the image dimensions on the server.

Here’s the updated code:

```javascript
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
      <p>
        Image Dimensions: {imageData.width} x {imageData.height}
      </p>
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
```

### Explanation:

- **`probe-image-size`**:

  - This library is used to retrieve image dimensions and other metadata directly in a Node.js environment, making it suitable for SSR.
  - The `getImageData` function now fetches the image's dimensions using `probe`.

- **No More Browser-Specific APIs**:
  - Since `createImageBitmap` was a browser-specific API, replacing it with `probe-image-size` allows the code to run correctly on the server during SSR.

With these changes, your Next.js page will render the image and its metadata on the server side without encountering errors related to unsupported browser APIs.
