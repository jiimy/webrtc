'use client';
import { useSocket } from '@/context/SocketContext';
import React, { useCallback, useEffect, useState } from 'react';
import VideoCotainer from '../videoContainer/VideoCotainer';

const VideoCall = () => {
  const { localStream } = useSocket();
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

  return (
    <div>
      <div>
      {localStream && <VideoCotainer stream={localStream} isLocalStream={true} isOnCall={false} />}
      </div>
      <div className='mt-8 flex items-center'>
        <button></button>
      </div>
    </div>
  );
};

export default VideoCall;