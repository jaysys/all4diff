import React from "react";

async function Ssr() {
  // Fetch the data during build time
  const res = await fetch("https://66cc88b9a4dd3c8a71b7f996.mockapi.io/users");
  const users = await res.json();

  return (
    <div>
      <h1>SSG page</h1>
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

// Mark the page as statically generated
export const dynamic = "force-static";

export default Ssr;
