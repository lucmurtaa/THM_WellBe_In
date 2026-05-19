import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export function Layout({ children }) {
  return (
    <>
      <Header />
      {children ?? <Outlet />}
      <Footer />
    </>
  );
}