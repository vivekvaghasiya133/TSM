import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMode } from '../../theme';
import Sidebar from '../global/Sidebar';
import Topbar from '../global/Topbar';

function Protect({ children }) {
  const navigate = useNavigate();
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <div className="app">
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          {children}
        </main>
      </div>
    </>
  )
}

export default Protect
