'use client';
import { useSocket } from '@/context/SocketContext';
import { useUser } from '@clerk/nextjs';
import React from 'react';

const ListOnlineUsers = () => {
  const { user } = useUser();
  const { onlineUsers } = useSocket();
  return (
    <div>
      {onlineUsers && onlineUsers.map((onlineUser) => (
        <div key={onlineUser.userId}>{onlineUser.profile.fullName?.split(' ')[0]}</div>
      ))}
    </div>
  );
};

export default ListOnlineUsers;