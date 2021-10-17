import { auth } from 'firebase';
import React, { FC, memo } from 'react';

const SignOut: FC = () => auth.currentUser && (
  <button
    type="button"
    onClick={() => auth.signOut()}
    className="text-red-500"
  >
    Leave Chat
  </button>
);

export default memo(SignOut);
