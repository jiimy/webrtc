import { SocketUser } from "@/types";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from 'socket.io-client';

interface ISocketContext {
  onlineUsers: SocketUser[] | null
}

export const SocketContext = createContext<ISocketContext | null>(null)

export const SocketContextProvier = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<SocketUser[] | null>(null);

  // console.log('user1', user);
  // console.log('user', onlineUsers, socket, isSocketConnected);

  // 소켓 초기화
  useEffect(() => {
    const newSocket = io();
    console.log('새 소켓 연결', newSocket)
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    }
  }, [user])

  useEffect(() => {
    if (socket === null) return;

    console.log('소켓 상태: ', socket.connected)
    if (socket.connected) {
      console.log('소켓 연결됨');
      onConnect();
    }
    function onConnect() {
      setIsSocketConnected(true);
    }
    function onDisconnect() {
      setIsSocketConnected(false);
    }
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [socket])

  // set online users
  useEffect(() => {
    if (!socket || !isSocketConnected) return;

    socket.emit('addNewUser', user);
    socket.on('getUsers', (res) => {
      setOnlineUsers(res)
    })

    return () => {
      socket.off('getUsers', (res) => {
        setOnlineUsers(res)
      })
    }
  }, [socket, isSocketConnected, user])

  return <SocketContext.Provider value={{ onlineUsers }}>
    {children}
  </SocketContext.Provider>
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === null) {
    throw new Error('에러');
  }
  return context
}