import styled from '@emotion/styled';
import scene from 'assets/images/scene.png';
import clsx from 'clsx';
import Header from 'components/Layout/Header';
import Toast from 'components/Toast';
import { auth, firestore } from 'config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  addDoc,
  collection, doc,
  getDoc, serverTimestamp,
} from 'firebase/firestore';
import React, {
  FC, memo, useEffect, useState,
} from 'react';
import { BiMessageAdd } from 'react-icons/bi';
import { FaKeyboard } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const SHome = styled.div`
  height: calc(100vh - 56px);
`;

const Home: FC = () => {
  const history = useHistory();
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName);
  const [disabledCreate, setDisabledCreate] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [showJoinBtn, setShowJoinBtn] = useState(false);
  const roomRef = collection(firestore, 'rooms');

  useEffect(() => {
    onAuthStateChanged(auth, () => setDisplayName(auth.currentUser?.displayName));
  }, []);

  const createNewRoom = async () => {
    if (!disabledCreate) {
      setDisabledCreate(true);
      await addDoc(roomRef, {
        cratorName: displayName,
        createdAt: serverTimestamp(),
      }).then(roomData => {
        history.push(`/room/${roomData.id}`);
        setDisabledCreate(false);
        Toast({
          message: 'Room created',
          type: 'success',
        });
      });
    }
  };

  const joinRoom = async () => {
    if (roomCode) {
      const docRef = doc(firestore, 'rooms', roomCode);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        history.push(`/room/${docSnap.id}`);
      } else {
        Toast({ message: "Couldn't find the room you're trying to join", type: 'error' });
      }
    }
  };

  return (
    <>
      <Header />
      <SHome className="container px-5 flex justify-center">
        <div className="flex w-full items-center flex-col sm:flex-row">
          <div className="w-full sm:w-1/2 pt-20 h-1/2">
            <h1 className="text-2xl sm:text-3xl font-medium text-gray-700 mb-5 sm:mb-10">
              Welcome
              {' '}
              <span className="text-green-600">
                {displayName}
              </span>
              {' !'}
            </h1>
            <div className="flex flex-col md:flex-row">
              <button type="button" disabled={disabledCreate} onClick={createNewRoom} className="btn btn-primary mb-4 md:mb-0 md:mr-4">
                <BiMessageAdd size={16} className="mr-2" />
                Create New Room
              </button>
              <div className="flex md:max-w-xs">
                <div
                  className="border-2 border-gray-400 rounded flex items-center flex-grow-0 px-2 focus-within:border-green-500 w-full"
                  style={{ height: 44 }}
                >
                  <FaKeyboard className="mr-2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Enter room code"
                    className="mb-0 w-full h-full rounded focus:outline-none text-gray-500"
                    value={roomCode}
                    onChange={e => setRoomCode(e.target.value)}
                    onFocus={() => setShowJoinBtn(true)}
                    onBlur={() => !roomCode && setShowJoinBtn(false)}
                  />
                </div>
                <button
                  type="button"
                  onClick={joinRoom}
                  disabled={!roomCode}
                  className={clsx('text-green-500 flex-grow pr-4 md:pr-0 ml-4 disabled:text-gray-400', !showJoinBtn && 'hidden')}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="h-full flex items-center">
            <img src={scene} alt="chat scene" />
          </div>
        </div>
      </SHome>
    </>
  );
};

export default memo(Home);
