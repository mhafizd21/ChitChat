import styled from '@emotion/styled';
import Tippy from '@tippyjs/react';
import SignOut from 'components/Layout/SignOut';
import Preloader from 'components/Preloader';
import Toast from 'components/Toast';
import { auth, firestore } from 'config/firebase';
import dayjs from 'dayjs';
import { UserInfo } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  limit,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import React, {
  FC, memo, useEffect, useRef, useState,
} from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useCollectionData } from 'react-firebase9-hooks/firestore';
import { FaArrowLeft, FaLink } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import noMessageImg from './assets/no-message.png';
import sentIcon from './assets/sent.svg';
import ChatMessage from './components/ChatMessage';

const InputStyled = styled.input`
  display: flex;
  max-width: 100%;
  overflow-y: hidden;
  min-height: 44px;
  overflow-wrap: break-word;
  height: max-content;
`;

const ChatRoom: FC = () => {
  const { id: roomId } = useParams<{ id: string }>();
  const history = useHistory();
  const messageRef = collection(firestore, 'messages');
  const queryMessage = query(messageRef, where('roomId', '==', roomId), orderBy('createdAt'), limit(100));
  const [messages, loading] = useCollectionData(queryMessage, { idField: 'id' });
  const [messageValue, setMessageValue] = useState('');

  const scrollPoint = useRef<HTMLDivElement>(null);
  const buttonCopyRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkRoom = async () => {
      const docRef = doc(firestore, 'rooms', roomId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        Toast({ message: "Couldn't find the room you're trying to join", type: 'error' });
        history.push('/');
      }
    };

    checkRoom();
  }, []);

  useEffect(() => {
    scrollPoint.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = auth.currentUser as UserInfo;

    if (messageValue.toString().trim()) {
      setMessageValue('');
      await addDoc(messageRef, {
        text: messageValue.toString().trim(),
        createdAt: serverTimestamp(),
        uid,
        photoURL,
        displayName,
        roomId,
      })
        .then(() => {
          scrollPoint.current?.scrollIntoView({ behavior: 'smooth' });
        });
    }
  };

  return (
    <>
      <header className="sticky top-0 max-w-screen flex justify-between px-5 py-3 bg-white shadow-md z-10">
        <div className="flex items-center">
          <Tippy
            content="Back to Homepage"
            className="tooltip"
            delay={100}
            duration={0}
          >
            <button type="button" className="mr-4" onClick={() => history.push('/')}>
              <FaArrowLeft className="text-green-700" />
            </button>
          </Tippy>
          <h1 className="text-green-600 font-black text-xl md:text-2xl">Chat Room</h1>
          <CopyToClipboard
            text={window.location.href}
            onCopy={() => Toast({ message: 'Room URL Copied!', type: 'success' })}
          >
            <button type="button" ref={buttonCopyRef}>
              <FaLink className="text-green-700 ml-3" />
            </button>
          </CopyToClipboard>
          <Tippy
            content="Copy Room URL"
            className="tooltip"
            delay={100}
            duration={0}
            reference={buttonCopyRef}
          />
        </div>
        <SignOut />
      </header>
      <div className="container px-5 pb-20 sm:pb-28" style={{ minHeight: 'calc(100vh - 56px)' }}>
        {loading && <Preloader />}
        {messages?.map((message, id) => {
          const timeStamp = message?.createdAt ? new Date(message?.createdAt?.seconds * 1000) : '';
          const timeStampPrev = new Date(messages[id - 1]?.createdAt?.seconds * 1000);
          const messageDate = dayjs(timeStamp).format('DD MM YYYY');
          const prevMessageDate = dayjs(timeStampPrev).format('DD MM YYYY');
          const dateText = () => {
            const dateToday = dayjs(new Date()).format('YYYY-MM-DD');
            const countDiff = dayjs(dateToday).diff(timeStamp, 'h', true);

            if (countDiff < 0) {
              return 'Today';
            } if (countDiff < 24) {
              return 'Yesterday';
            }
            if (!timeStamp) {
              return null;
            }
            return dayjs(timeStamp).format('DD MMM YYYY');
          };

          return (
            <div key={message.id}>
              {messageDate !== prevMessageDate && (
                <div className="text-center mt-2 text-gray-700 text-sm">
                  {dateText()}
                </div>
              )}
              <ChatMessage message={message} timeStamp={timeStamp} />
            </div>
          );
        })}
        {!loading && !messages?.length && (
          <div className="flex items-center justify-center flex-col pt-36 sm:pt-40">
            <img src={noMessageImg} alt="No message yet" className="w-60 sm:w-80" />
            <p className="text-2xl sm:text-3xl text-gray-400 font-medium">
              No messages yet
            </p>
          </div>
        )}
        <div ref={scrollPoint} />
      </div>
      <div className="fixed bottom-0 w-screen bg-white sm:pb-8">
        <div className="container px-5">
          <form onSubmit={sendMessage} className="flex py-3 items-end">
            <InputStyled
              type="text"
              value={messageValue}
              onChange={e => setMessageValue(e.target.value)}
              placeholder="Write your message here..."
              className="flex-1 mr-3 bg-gray-200 p-2 text-gray-600 rounded"
            />
            <button type="submit" className="btn btn-primary">
              <img src={sentIcon} alt="sent icon" width={20} height={20} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default memo(ChatRoom);
