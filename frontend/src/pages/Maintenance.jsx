import { useEffect, useState } from 'react';

export default function Maintenance() {
  const [items, setItems] = useState([]);

  const load = async () => {
    const res = await fetch('http://localhost:5000/api/maintenance');
    setItems(await res.json());
  };

  useEffect(() => { load(); }, []);

  const addRequest = async () => {
    const description = prompt('Describe issue');
    if (!description) return;
    await fetch('http://localhost:5000/api/maintenance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description })
    });
    await fetch('http://localhost:5000/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create maintenance', description })
    });
    load();
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <img src="/logo.png" alt="Logo" className="mb-4 w-32" />
      <button onClick={addRequest} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
        Create New Request
      </button>
      <div className="space-y-3">
        {items.map((m,i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            {m.description}
          </div>
        ))}
      </div>
    </div>
  );
}
