import styled from '@emotion/styled';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { auth } from 'config/firebase';
import React, {
  FC, memo,
} from 'react';

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  padding-top: 12px;
  @media(min-width: 640px) {
    padding-top: 20px;
  }
  &.sent {
    justify-content: flex-end;
  }
  &.received {
    justify-content: flex-start;
  }
`;

const MessageStyled = styled.div`
  width: auto;
  max-width: 60vw;
  overflow-wrap: break-word;
  .time-text {
    position: relative;
    &.received {
      right: -16px;
      @media(min-width: 640px) {
        right: -8px;
      }
    }
    &.sent {
      margin-top: 4px;
      right: -6px;
    }
  }
  @media(min-width: 640px) {
    max-width: 40vw;
  }
`;

const ChatMessage: FC<{ message: any; timeStamp: Date | ''; }> = ({ message, timeStamp }) => {
  const {
    text, uid, photoURL, displayName,
  } = message;
  const isOwner = uid === auth.currentUser?.uid;
  const messageClass = isOwner ? 'sent' : 'received';
  const sentAt = dayjs(timeStamp).format('HH:mm');

  if (!timeStamp) {
    return null;
  }

  return (
    <MessageContainer className={messageClass}>
      {!isOwner && (
        <img src={photoURL} alt="user avatar" className="rounded-full h-10 w-10 mt-2 mr-3" />
      )}
      <MessageStyled className={clsx('mt-2 px-3 sm:px-4 rounded', isOwner ? 'bg-green-400 py-2 pl-5 pr-4' : 'bg-gray-300 py-1 pr-6')}>
        {!isOwner && (
        <p className="text-xs text-green-700 font-medium">
          {' '}
          {displayName}
          {' '}
        </p>
        )}
        <p className="text-sm sm:text-base text-gray-800">
          {text}
        </p>
        <p className={clsx('text-xxs text-right text-gray-500 time-text', messageClass)}>
          {sentAt}
        </p>
      </MessageStyled>
    </MessageContainer>
  );
};

export default memo(ChatMessage);
