import { auth } from 'firebase';
import React, { FC, memo } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import google from '../assets/google.svg';

const SignIn: FC = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <button type="button" onClick={signInWithGoogle} className="btn btn-outline-primary items-center">
      <img src={google} alt="google icon" width={18} height={18} className="mr-3" />
      Sign in with Google
    </button>
  );
};

export default memo(SignIn);
