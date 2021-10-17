import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { auth, firestore } from 'firebase';
import { UserInfo } from 'firebase/auth';
import {
  addDoc, collection, limit, orderBy, query, serverTimestamp,
} from 'firebase/firestore';
import React, {
  FC, memo, useRef, useState,
} from 'react';
import { useCollectionData } from 'react-firebase9-hooks/firestore';
import sentIcon from './assets/sent.svg';
import ChatMessage from './components/ChatMessage';
import SignOut from './components/SignOut';

const InputStyled = styled.input`
  display: flex;
  max-width: 100%;
  overflow-y: hidden;
  min-height: 44px;
  overflow-wrap: break-word;
  height: max-content;
`;

const ChatRoom: FC = () => {
  const messageRef = collection(firestore, 'messages');
  const queryMessage = query(messageRef, orderBy('createdAt'), limit(25));
  const [messages] = useCollectionData<any>(queryMessage, { idField: 'id' });
  const [messageValue, setMessageValue] = useState('');

  const scrollPoint = useRef<HTMLDivElement>(null);

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
      });

      scrollPoint.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="sticky top-0 max-w-screen flex justify-between px-5 py-3 bg-white shadow-md z-10">
        <h1 className="text-green-900 font-black">Chat Room</h1>
        <SignOut />
      </div>
      <div className="container px-5 pb-20 sm:pb-28">
        {messages?.map((message, id) => {
          const timeStamp = new Date(message?.createdAt?.seconds * 1000);
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
            return dayjs(timeStamp).format('DD MMM YYYY');
          };

          return (
            <>
              {messageDate !== prevMessageDate && (
                <div className="text-center mt-2 text-gray-700 text-sm">
                  {dateText()}
                </div>
              )}
              <ChatMessage key={message.id} message={message} timeStamp={timeStamp} />
            </>
          );
        })}
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
