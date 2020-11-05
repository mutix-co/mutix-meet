import { useEffect, useState } from 'react';
import AgoraSDK from 'agora-rtc-sdk';
import * as yup from 'yup';
import { Formik } from 'formik';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const schema = yup.object().shape({
  microphone: yup.string().required(),
  webcam: yup.string().required(),
});

const WebCam = styled.div`
  width: 640px;
  height: 480px;
`;


export default function Lobby(): JSX.Element {
  const router = useRouter();
  const [webcams, setWebcams] = useState([]);
  const [microphones, setMicrophones] = useState([]);
  const [remotes, setRemotes] = useState([]);

  useEffect(() => {
    let myid = '';
    const client = AgoraSDK.createClient({ mode: "live", codec: "vp8" });

    client.on("stream-published", (evt) => {
      Toast.notice("stream published success")
      console.log("stream-published")
    });

    client.on("stream-added", (evt) => { 
      const remoteStream = evt.stream
      const id = remoteStream.getId();
      if (id === myid) return;
      console.log(`stream-added: ${id}`);
      setRemotes([id]);
      setTimeout(() => client.subscribe(remoteStream), 1000);
    })

    client.on("stream-subscribed", (evt) => {
      const remoteStream = evt.stream;
      const id = remoteStream.getId();
      console.log(`stream-subscribed: ${id}`);
      remoteStream.play("remote_video_" + id)
    })

    client.init('a4a54c525ad04369aded2c222a464487', () => {
      console.log("init success");

      console.log('query', router.query);

      client.join(
        "006a4a54c525ad04369aded2c222a464487IABx0Tkigt0zsMnEoiJMVf4bcIUPJHzx5QbRdHKgR9S7x60g6/kAAAAAEAAT20h7+4SlXwEAAQD6hKVf",
        "helloworld",
        null,
        (uid) => {
          myid = uid;
          console.log("join channel: helloworld success, uid: " + uid);
          console.log(router.query);
          const localStream = AgoraSDK.createStream({
            streamID: uid,
            audio: true,
            video: true,
            screen: false,
            microphoneId: router.query.microphone,
            cameraId: router.query.webcam
          });

          localStream.init(() => {
            console.log("init local stream success");
            localStream.play("local_stream");

            client.publish(localStream);
          });
      });
    })
  }, []);

  return (
    <div>
      <WebCam id="local_stream"></WebCam>
      {remotes.map(id => <WebCam id={`remote_video_${id}`}></WebCam>)}
    </div>
  );
}
