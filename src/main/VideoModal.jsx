// src/components/VideoModal.jsx
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { Dialog, DialogContent } from '@mui/material';

const VideoModal = ({ open, onClose, streamUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (open && streamUrl) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(streamUrl); // ex: http://serveur/live/cam1/index.m3u8
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = streamUrl;
      }
    }
  }, [open, streamUrl]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <video ref={videoRef} controls autoPlay style={{ width: '100%' }} />
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
