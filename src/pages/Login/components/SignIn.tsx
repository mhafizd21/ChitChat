import { auth } from 'config/firebase';
import React, { FC, memo } from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import utils from 'config/utils';
import useStore from 'stores/store';
import google from '../assets/google.svg';

const SignIn: FC = () => {
  const history = useHistory();
  const afterLoginPath = useStore(s => s.afterLoginPath);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    onAuthStateChanged(auth, user => {
      if (user) {
        utils.setToken(user.uid);
        if (afterLoginPath) {
          history.push(afterLoginPath);
        } else {
          history.push('/');
        }
      }
    });
  };

  return (
    <button type="button" onClick={signInWithGoogle} className="btn btn-outline-primary items-center">
      <img src={google} alt="google icon" width={18} height={18} className="mr-3" />
      Sign in with Google
    </button>
  );
};

export default memo(SignIn);
