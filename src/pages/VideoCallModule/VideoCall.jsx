import React, { useRef, useState, useEffect } from 'react';
import SimplePeer, { Instance, SignalData } from 'simple-peer';

// enum ConnectionStatus {
//   OFFERING,
//   RECEIVING,
//   CONNECTED,
// }

const ConnectionStatus = {
  OFFERING: 'OFFERING',
  RECEIVING: 'RECEIVING',
  CONNECTED: 'CONNECTED',
};

const webSocketConnection = new WebSocket('ws://localhost:8080/videochat');

export default function VideoCall() {
  const videoSelf = useRef(null); // with T <HTMLVideoElement | null>
  const videoCaller = useRef(null); // with T <HTMLVideoElement | null>
  const [connectionStatus, setConnectionStatus] = useState(null); // with T <ConnectionStatus | null>
  const [offerSignal, setOfferSignal] = useState(); // with T <SignalData>
  const [simplePeer, setSimplePeer] = useState(); // with T <Instance>

  useEffect(() => {
    webSocketConnection.onmessage = message => {
      const payload = JSON.parse(message.data);
      if (payload?.type === 'offer') {
        setOfferSignal(payload);
        setConnectionStatus(ConnectionStatus.RECEIVING);
      } else if (payload?.type === 'answer') simplePeer?.signal(payload);
    };
  }, [simplePeer]);

  /**
   * Send or accept an offer
   * @param {boolean} isInitiator the initiator of the connection
   * @param {SignalData} offer the offer signal
   */
  const sendOrAcceptInvitation = (isInitiator, offer) => {
    navigator.mediaDevices.getUserMedia({}).then(mediaStream => {
      const video = videoSelf.current;

      if (video) {
        video.srcObject = mediaStream;
        video.play();
      } else {
        console.error('videoSelf current not found');
      }
      const sp = new SimplePeer({
        trickle: false,
        initiator: isInitiator,
        stream: mediaStream,
      });

      if (isInitiator) setConnectionStatus(ConnectionStatus.OFFERING);
      else offer && sp.signal(offer);

      sp.on('signal', data => webSocketConnection.send(JSON.stringify(data)));
      sp.on('connect', () => setConnectionStatus(ConnectionStatus.CONNECTED));
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
    });
  };

  return (
    <div className="web-rtc-page">
      {connectionStatus === null && (
        <button onClick={() => sendOrAcceptInvitation(true)}>CALL</button>
      )}
      {connectionStatus === ConnectionStatus.OFFERING && <div className="loader"></div>}
      {connectionStatus === ConnectionStatus.RECEIVING && (
        <button onClick={() => sendOrAcceptInvitation(false, offerSignal)}>ANSWER CALL</button>
      )}
      <div className="video-container">
        <video ref={videoSelf} className="video-block" />
        <video ref={videoCaller} className="video-block" />
      </div>
    </div>
  );
}
