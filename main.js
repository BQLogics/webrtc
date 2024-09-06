// const localVideo = document.getElementById('local-video');
// let localStream;
// let remoteStream;
// let peerConnection;
// const callBtn = document.getElementById('call-btn');
// const hangupBtn = document.getElementById('hangup-btn');

// callBtn.addEventListener('click', call);
// hangupBtn.addEventListener('click', hangup);
// async function call() {
//     try {
//       const configuration = { 
//         // Add custom iceServers 
//          "iceServers": [{ "url": "stun:stun.1.google.com:19302" }] 
//       };
  
//       // create peer connection object
//       peerConnection = new RTCPeerConnection(configuration);
  
//       // add tracks to the connection
//       localStream.getTracks().forEach(track => {
//         peerConnection.addTrack(track, localStream);
//       });
  
//       // set up event listeners for the connection
//       peerConnection.addEventListener('track', event => {
//         remoteVideo.srcObject = event.streams[0];
//         remoteStream = event.streams[0];
//       });
  
//       // create offer
//       const offer = await peerConnection.createOffer();
//       await peerConnection.setLocalDescription(offer);
  
//       // send offer to the other client
//       // this is where you would use a signaling server
//       // to exchange SDP (Session Description Protocol) messages
//       // between the two clients
//     } catch (error) {
//       console.error('Error creating peer connection:', error);
//     }
//   }

const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');
let localStream;
let remoteStream;
let peerConnection;
const callBtn = document.getElementById('call-btn');
const hangupBtn = document.getElementById('hangup-btn');

callBtn.addEventListener('click', call);
hangupBtn.addEventListener('click', hangup);

async function call() {
  try {
    // Get local stream from webcam and microphone
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;

    const configuration = { 
      iceServers: [{ urls: "stun:stun.1.google.com:19302" }] 
    };

    // Create peer connection object
    peerConnection = new RTCPeerConnection(configuration);

    // Add tracks to the connection
    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream);
    });

    // Set up event listener for receiving remote track
    peerConnection.addEventListener('track', event => {
      remoteVideo.srcObject = event.streams[0];
      remoteStream = event.streams[0];
    });

    // Create and set local offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // Send offer to signaling server here (not implemented)
    // e.g., signalingServer.send({ type: 'offer', data: offer });

  } catch (error) {
    console.error('Error creating peer connection:', error);
  }
}

function hangup() {
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
    console.log("Call ended.");
  }
}
