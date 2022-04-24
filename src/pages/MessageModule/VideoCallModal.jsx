import { Modal, Box, Typography, Button, CircularProgress } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SimplePeer from 'simple-peer';
import { ConnectionStatus } from './constant';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { setConnectionStatus } from './message.reducer';

export default function VideoCall() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [mediaStream, setMediaStream] = useState(null);
  const connectionStatus = useAppSelector(state => state.message.connectionStatus);
  const offerSignal = useAppSelector(state => state.message.offerSignal);
  const [simplePeer, setSimplePeer] = useState(null);

  const { from, to } = useParams();

  const socket = new WebSocket('ws://localhost:8080/videochat/' + from);

  const videoSelf = useRef(null);
  const videoCaller = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(mediaStream => {
      setMediaStream(mediaStream);

      const video = videoSelf.current;

      if (video) {
        video.srcObject = mediaStream;
        video.play();
      } else {
        console.error('video not found');
      }
    });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onmessage = message => {
        const data = JSON.parse(message.data);
        if (data?.type === 'answer') {
          simplePeer?.signal(data);
        }
      };
    }
  }, [simplePeer, socket]);

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  /**
   * Send or accept an offer
   * @param {boolean} isInitiator the initiator of the connection
   * @param {SignalData} offer the offer signal
   */
  const sendOrAcceptInvitation = (isInitiator, offer) => {
    if (mediaStream) {
      const sp = new SimplePeer({
        trickle: false,
        initiator: isInitiator,
        stream: mediaStream,
      });

      if (isInitiator) {
        dispatch(setConnectionStatus(ConnectionStatus.OFFERING));
      } else {
        offer && sp.signal(offer);
      }

      sp.on('signal', data => {
        socket.send(JSON.stringify({ ...data, from, to }));
      });
      sp.on('connect', () => dispatch(setConnectionStatus(ConnectionStatus.CONNECTED)));
      sp.on('stream', stream => {
        const video = videoCaller.current;
        if (video) {
          video.srcObject = stream;
          video.play();
        } else {
          console.error('videoCaller current not found');
        }
      });
      setSimplePeer(sp);
    } else {
      console.error('mediaStream not found');
    }
  };

  const handUp = () => {
    // TODO: remove stream
    simplePeer?.destroy();
    dispatch(setConnectionStatus(null));
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Video Call
        </Typography>
        <Box mt={2} display="flex" flexDirection="row">
          <video style={{ heigth: '100%', width: '700px', margin: '10px' }} ref={videoCaller} />
          <Box display="flex" flexDirection="column">
            <video
              ref={videoSelf}
              style={{ heigth: '185px', width: '300px', margin: '10px' }}
              muted
            />
          </Box>
        </Box>
        <Box component="div" display="flex" mt={2}>
          {connectionStatus === null && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => sendOrAcceptInvitation(true)}
            >
              Call
            </Button>
          )}
          {connectionStatus === ConnectionStatus.OFFERING && <CircularProgress />}
          {connectionStatus === ConnectionStatus.RECEIVING && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => sendOrAcceptInvitation(false, offerSignal)}
            >
              Answer
            </Button>
          )}
          &nbsp;
          <Button variant="text" onClick={handUp}>
            Handup
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
