"use client"
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock, Upload, Calendar, UserPlus, Kanban, Menu, X } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const menuItems = useMemo(() => [
    { icon: Clock, label: 'Recent', href: '/home' },
    { icon: Upload, label: 'Upload meet', href: '/home/transcribe' },
    { icon: Calendar, label: 'Schedule', href: '/home/appointment' },
    { icon: UserPlus, label: 'Invite', href: '/home/invite' },
    { icon: Kanban, label: 'Kanban', href: '/home/kanban' },
  ], []);

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    const handleRouteChange = (url) => {
      handleRouteChangeStart();
      // Simulate loading for a short duration (optional)
     // setTimeout(handleRouteChangeComplete, 300);
    };

    window.addEventListener('routeChangeStart', handleRouteChange);
    window.addEventListener('routeChangeComplete', handleRouteChangeComplete);
    window.addEventListener('routeChangeError', handleRouteChangeComplete);

    return () => {
      window.removeEventListener('routeChangeStart', handleRouteChange);
      window.removeEventListener('routeChangeComplete', handleRouteChangeComplete);
      window.removeEventListener('routeChangeError', handleRouteChangeComplete);
    };
  }, []);

  const renderMenuItem = useCallback(({ icon: Icon, label, href }, index) => {
    const isActive = pathname === href;
    return (
      <li key={index}>
        <Link 
          href={href}
          className={`flex items-center p-4 transition-colors duration-200 
            ${isCollapsed ? 'justify-center' : 'pl-6'}
            ${isActive 
              ? 'bg-blue-100 text-blue-600' 
              : 'hover:bg-blue-50 hover:text-blue-600'
            }`}
        >
          <Icon size={24} className={isCollapsed ? 'mx-auto' : 'mr-4'} />
          {!isCollapsed && <span className="text-lg">{label}</span>}
        </Link>
      </li>
    );
  }, [isCollapsed, pathname]);

  return (
    <div className={`bg-white text-gray-900 h-screen shadow-lg ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out flex flex-col`}>
      <div>
        <button 
          onClick={toggleSidebar} 
          className="p-4 w-full flex justify-end hover:bg-gray-100 transition-colors duration-200"
        >
          {isCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
        <nav>
          <ul className="space-y-2">
            {menuItems.map(renderMenuItem)}
          </ul>
        </nav>
      </div>
      <div className={`mt-auto border-t border-gray-200 flex items-center justify-start space-x-3 p-4 transition-colors duration-200 
          ${isCollapsed ? 'justify-center' : 'pl-6'}`}>
        <UserButton size={24} className={isCollapsed ? 'mx-auto' : 'mr-4'} />
        {!isCollapsed && <span className="text-lg">Settings</span>}
      </div>
      {loading && <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">Loading...</div>}
    </div>
  );
};

export default Sidebar;