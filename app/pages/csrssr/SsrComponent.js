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
