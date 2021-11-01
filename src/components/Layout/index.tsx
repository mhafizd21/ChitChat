import React, { FC, memo } from 'react';
import Header from './Header';

interface LayoutProps {
  children: string | React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default memo(Layout);
