import React from "react";

// This component uses ISR to regenerate the page based on a revalidation interval
async function Isr() {
  // Fetch the data at build time and regenerate at specified intervals
  const res = await fetch("https://66cc88b9a4dd3c8a71b7f996.mockapi.io/users", {
    next: { revalidate: 60 }, // Regenerate the page every 60 seconds
  });
  const users = await res.json();

  return (
    <div>
      <h1>ISR page</h1>
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

export default Isr;
