'use client';
import { useSocket } from '@/context/SocketContext';
import React, { useCallback, useEffect, useState } from 'react';
import VideoCotainer from '../videoContainer/VideoCotainer';
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from 'react-icons/md';

const VideoCall = () => {
  const { localStream, peer, isCallEnded, ongoingCall, handleHangup } = useSocket();
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVidOn, setIsVidOn] = useState(false);

  useEffect(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0]
      setIsVidOn(videoTrack.enabled)
      const audioTrack = localStream.getVideoTracks()[0]
      setIsMicOn(audioTrack.enabled)
    }
  }, [localStream])

  const toggleCamera = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0]
      videoTrack.enabled = !videoTrack.enabled
      setIsVidOn(videoTrack.enabled)
    }
  }, [localStream]);

  const toggleMic = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getVideoTracks()[0]
      audioTrack.enabled = !audioTrack.enabled
      setIsMicOn(audioTrack.enabled)
    }
  }, [localStream]);

  const isOnCall = localStream && peer && ongoingCall ? true : false;

  if(!isCallEnded) {
    return <div className="mt-5 text-rose-500 text-center">Call Ended</div>
  }

  if(!localStream && !peer) return;

  return (
    <div>
      <div className='mt-4 relative'>
        {localStream && <VideoCotainer stream={localStream} isLocalStream={true} isOnCall={isOnCall} />}
        {peer && peer.stream && <VideoCotainer stream={peer.stream} isLocalStream={false} isOnCall={isOnCall} />}
      </div>
      <div className='mt-8 flex items-center justify-center'>
        <button onClick={toggleMic}>
          {isMicOn && <MdMicOff size={28} />}
          {!isMicOn && <MdMic size={28} />}
        </button>
        <button className="px-4 py-2 bg-rows-500 text-white rounded mx-4" onClick={() => handleHangup({
          ongoingCall: ongoingCall ? ongoingCall : undefined, isEmitHangup: true
        })}>
          End Call
        </button>
        <button onClick={toggleCamera}>
          {isVidOn && <MdVideocamOff size={28} />}
          {!isVidOn && <MdVideocam size={28} />}
        </button>
      </div>
    </div>
  );
};

export default VideoCall;