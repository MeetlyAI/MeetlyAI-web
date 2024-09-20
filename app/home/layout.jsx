import React from 'react';
import NavBar from './components/nav-bar';
import Sidebar from './components/side-nav';

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <main className="flex-1 overflow-y-auto ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;