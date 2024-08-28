import React from "react";

// This is now a server component by default in the App Router
async function Ssr() {
  const res = await fetch("https://66cc88b9a4dd3c8a71b7f996.mockapi.io/users", {
    cache: "no-store", // Ensure that the data is fetched on every request
  });
  const users = await res.json();

  return (
    <div>
      <h1>SSR page</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id} | {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ssr;
