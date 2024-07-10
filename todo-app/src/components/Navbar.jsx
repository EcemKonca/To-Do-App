import React from 'react';
import { MdExitToApp } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost/todoapp/api/logout.php', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred while logging out:', error);
    }
  };

  return (
    <div className="navbar">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-1"></div>
        <h1 className="flex-1 text-center">To Do App</h1>
        <div className="flex-1 text-right">
          <MdExitToApp
            onClick={handleLogout}
            className="text-primary cursor-pointer text-4xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
