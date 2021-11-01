import React, { FC, memo } from 'react';
import SignOut from './SignOut';

const Header: FC = () => (
  <header className="sticky top-0 max-w-screen flex justify-between px-5 py-3 bg-white shadow-md z-10">
    <h1 className="text-green-600 font-black text-xl md:text-2xl">ChitChat</h1>
    <SignOut />
  </header>
);

export default memo(Header);
