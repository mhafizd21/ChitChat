import React from 'react';
import { auth } from 'firebase';
import ChatRoom from 'pages/ChatRoom/ChatRoom';
import Login from 'pages/Login/Login';
import { useAuthState } from 'react-firebase9-hooks/auth';
import './styles/tailwind.css';

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <section>
        {user ? <ChatRoom /> : <Login />}
      </section>
    </div>
  );
};

export default App;
