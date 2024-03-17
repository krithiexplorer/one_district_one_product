import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    localStorage.clear();
    const navigate = useNavigate();
    useEffect(() => {
      try {
        localStorage.clear();
        // Additional cleanup or side effects related to logging out can go here
      } catch (error) {
        console.error('Failed to clear localStorage:', error);
      }
      
      navigate('/');
      window.location.reload();
    }, [navigate]);
}
