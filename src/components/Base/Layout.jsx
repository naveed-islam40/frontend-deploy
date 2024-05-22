// Layout.jsx
import React from 'react';
import Sidebar2 from './Sidebar2';

const Layout = ({ children }) => (
  <div className='flex flex-col min-h-screen'>
    <Sidebar2 />
  </div>
);

export default Layout;