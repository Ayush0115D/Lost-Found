import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg transition-all duration-300"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;
