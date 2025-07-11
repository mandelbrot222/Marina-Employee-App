import { useEffect, useState } from 'react';

export default function Logs() {
  const [logs, setLogs] = useState([]);

  const load = async () => {
    const res = await fetch('http://localhost:5000/api/logs');
    setLogs(await res.json());
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <img src="/logo.png" alt="Logo" className="mb-4 w-32" />
      <div className="space-y-2">
        {logs.map((l, i) => (
          <div key={i} className="bg-white p-2 rounded shadow">
            {l.timestamp} - {l.action} {l.description || l.employee}
          </div>
        ))}
      </div>
    </div>
  );
}
