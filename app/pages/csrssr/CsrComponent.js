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
