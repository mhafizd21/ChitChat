import React, { FC, memo } from 'react';
import SignIn from './components/SignIn';

const Login: FC = () => (
  <div className="flex justify-center items-center w-screen h-screen flex-col">
    <h1 className="text-2xl font-bold text-green-700 mb-1">CHITCHAT</h1>
    <p className="text-med font-medium text-green-700 mb-5">Sign In to Use ChitChat</p>
    <SignIn />
  </div>
);

export default memo(Login);
