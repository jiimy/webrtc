'use client';
import { SocketContextProvier } from '@/context/SocketContext';
import React from 'react';

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketContextProvier>
      {children}
    </SocketContextProvier>
  );
};

export default SocketProvider;