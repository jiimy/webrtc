'use client';
import { useSocket } from '@/context/SocketContext';
import { useUser } from '@clerk/nextjs';
import React from 'react';
import Avatar from '../avatar/Avatar';

const ListOnlineUsers = () => {
  const { user } = useUser();
  const { onlineUsers, handleCall } = useSocket();
  return (
    <div>
      {onlineUsers && onlineUsers.map((onlineUser) => {
        if (onlineUser.profile.id === user?.id) return null;

        return (
          <div key={onlineUser.userId} onClick={() => handleCall(onlineUser)}>
            <Avatar src={onlineUser.profile.imageUrl} />
            <div>
              {onlineUser.profile.fullName?.split(' ')[0]}
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default ListOnlineUsers;