import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    if (res.ok) {
      localStorage.setItem('employeeCode', code);
      navigate('/menu');
    } else {
      alert('Invalid Code');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-100">
      <img src="/logo.png" alt="Logo" className="mb-6 w-40" />
      <input
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Enter Employee Code"
        className="p-2 border rounded"
      />
      <button
        onClick={handleLogin}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
}
