"use client";

import { useEffect, useState } from "react";

function page() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://66cc88b9a4dd3c8a71b7f996.mockapi.io/users"
      );
      const users = await res.json();
      setUsers(users);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>CSR page</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id}|{user.name}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default page;
