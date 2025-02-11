'use client';

import { useState } from 'react';

interface User {
  id: number;
  name: string;
}

export default function Counter({ users }: { users: User[] }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>There are {users.length} users</p>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
}
