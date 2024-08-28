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
