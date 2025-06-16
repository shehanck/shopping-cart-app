import { useEffect } from 'react';

const Logout = () => {

  useEffect(() => {
    localStorage.removeItem('token');
    alert('Logout successful!');
    window.location.href = '/'; 
  }, []);

  return null;
};

export default Logout;
