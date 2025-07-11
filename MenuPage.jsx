import React from 'react';
import { useNavigate } from 'react-router-dom';

function MenuPage() {
  const navigate = useNavigate();

  const options = [
    { label: 'Boat/Trailer Schedule', path: '/schedule' },
    { label: 'Maintenance Requests', path: '/maintenance' },
    { label: 'Move Outs', path: '/moveouts' },
    { label: 'Staff Schedule', path: '/logs' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <img src="/logo.png" alt="Logo" className="mb-8 w-40 mx-auto" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
        {options.map(opt => (
          <button
            key={opt.label}
            onClick={() => navigate(opt.path)}
            className="bg-blue-600 text-white py-8 rounded-lg shadow-lg text-xl hover:bg-blue-700"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
