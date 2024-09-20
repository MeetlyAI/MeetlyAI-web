"use client"

import { lazy, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Mail, Menu, X, Settings,ScrollText,Bot} from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { 
  Clock,        // Recent (represents time)
  Upload,       // Upload (direct file or content upload)
  Calendar,     // Calendar (for dates, events)
  UserPlus,     // Invite (represents adding or inviting a user)
  FilePlus      // Upload (alternative for upload of files/content)
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    // { icon: Home, label: 'Home', href: '/home' },
    // { icon: ScrollText, label: 'Resume Builder', href: '/home/resume' },
    //   { icon: Bot, label: 'AI Intrview', href: '/ai-intrview' },
    // // { icon: User, label: 'About', href: '/about' },
    // // { icon: Mail, label: 'Contact', href: '/contact' },
    {icon:Clock,label:'Recent',href:'/home'},
    {icon:Upload,label:'Upload meet',href:'/home/transcribe'},
    {icon:Calendar,label:'Shcedule',href:'/home/sc'},
    {icon:UserPlus,label:'Invite',href:'/home/invite'},
  ];

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
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <li key={index}>
                <Link 
                  href={item.href} 
                  className={`flex items-center p-4 transition-colors duration-200 
                    ${isCollapsed ? 'justify-center' : 'pl-6'}
                    ${isActive 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'hover:bg-blue-50 hover:text-blue-600'
                    }`}
                >
                  <item.icon size={24} className={isCollapsed ? 'mx-auto' : 'mr-4'} />
                  {!isCollapsed && <span className="text-lg">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
        </nav>
      </div>
      <div className="mt-auto border-t border-gray-200 flex items-center justify-start space-x-3 p-4 transition-colors duration-200 
            ${isCollapsed ? 'justify-center' : 'pl-6'}">
       
          <UserButton size={24} className={isCollapsed ? 'mx-auto' : 'mr-4'} />
          {!isCollapsed && <span className="text-lg">Settings</span>}
     
      </div>
    </div>
  );
};

export default Sidebar;