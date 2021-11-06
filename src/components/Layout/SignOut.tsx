import { auth } from 'config/firebase';
import utils from 'config/utils';
import React, { FC, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import useStore from 'stores/store';

const SignOut: FC = () => {
  const history = useHistory();
  const setAfterLoginPath = useStore(s => s.setAfterLoginPath);
  if (utils.getToken()) {
    return (
      <button
        type="button"
        onClick={async () => {
          await auth.signOut();
          utils.removeToken();
          onAuthStateChanged(auth, () => {
            history.push('/login');
            setAfterLoginPath('');
          });
        }}
        className="text-red-500"
      >
        Sign Out
      </button>
    );
  }

  return null;
};

export default memo(SignOut);
