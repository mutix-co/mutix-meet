import _ from 'lodash';
import React, { useEffect, useReducer, useState } from 'react';
import window from 'global/window';
import Lobby from './Lobby';
import Room from './Room';

const jitsiDomain = 'meet.jit.si';
const { JitsiMeetJS } = window;

let reRender = () => {};
let room = null;

JitsiMeetJS.init();
JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);

const connection = new JitsiMeetJS.JitsiConnection(null, null, {
  hosts: {
    domain: jitsiDomain,
    muc: `conference.${jitsiDomain}`,
  },
  bosh: `wss://${jitsiDomain}/xmpp-websocket`,
  websocket: `wss://${jitsiDomain}/xmpp-websocket`,
  clientNode: 'http://jitsi.org/jitsimeet',
});

let webcamTrack = null;
async function setWebcamTrack(cameraDeviceId) {
  if (webcamTrack !== null) room.removeTrack(webcamTrack);
  [webcamTrack] = (await JitsiMeetJS.createLocalTracks({ devices: ['video'], cameraDeviceId }));
  room.addTrack(webcamTrack);
  setTimeout(reRender, 1000);
}

let microphoneTrack = null;
async function setMicrophoneTrack(micDeviceId) {
  if (microphoneTrack !== null) room.removeTrack(microphoneTrack);
  [microphoneTrack] = (await JitsiMeetJS.createLocalTracks({ devices: ['audio'], micDeviceId }));
  room.addTrack(microphoneTrack);
  setTimeout(reRender, 1000);
}

async function setSpeaker(deviceId) {
  JitsiMeetJS.mediaDevices.setAudioOutputDevice(deviceId);
}

let webcams = [];
let microphones = [];
let speakers = [];

async function handleDeviceListChanged() {
  const videoinputs = [];
  const audioinputs = [];
  const audiooutputs = [];

  const devices = await new Promise((resolve) => JitsiMeetJS.enumerateDevices(resolve));
  devices.forEach(({ deviceId, kind, label }) => {
    if (deviceId === null) return;

    if (kind === 'videoinput') {
      videoinputs.push({ deviceId, kind, label });
      return;
    }

    if (kind === 'audioinput') {
      audioinputs.push({ deviceId, kind, label });
      return;
    }

    if (kind === 'audiooutput') {
      audiooutputs.push({ deviceId, kind, label });
    }
  });
  webcams = videoinputs;
  microphones = audioinputs;
  speakers = audiooutputs;
  setTimeout(reRender, 1000);
}

const whitelist = [
  'cantonese-1-cantonese',
  'cantonese-2-cantonese',
  'chinese-3-chinese',
  'chinese-4-chinese',
  'cantonese-5-cantonese',
  'cantonese-6-cantonese',
  'cantonese-interpretation-chinese',
  'chinese-interpretation-cantonese',
];

let participants = {};
async function handleParticipantsUpdate() {
  const tmp = {};

  _.forEach(room.participants, (participant) => {
    const displayNmae = participant.getDisplayName();
    if (whitelist.indexOf(displayNmae) > -1 === false) return;
    tmp[displayNmae] = participant;
  });

  if (room !== null) {
    const myName = room.displayNmae;
    if (whitelist.indexOf(myName) > -1) {
      tmp[myName] = {
        isMyself: true,
        getTracksByMediaType(mediaType) {
          return room.getLocalTracks().filter((track) => track.getType() === mediaType);
        },
      };
    }
  }

  participants = tmp;

  setTimeout(reRender, 1000);
}

function handleRoomJoin() {
  room = connection.initJitsiConference('a6dd417f2e365ea7c58747d21d480d0991a51628d20aeff4b698dbd6136996b9', {});
  room.join();

  room.on(
    JitsiMeetJS.events.conference.CONFERENCE_JOINED,
    handleParticipantsUpdate,
  );
  room.on(
    JitsiMeetJS.events.conference.USER_JOINED,
    handleParticipantsUpdate,
  );
  room.on(
    JitsiMeetJS.events.conference.USER_LEFT,
    handleParticipantsUpdate,
  );
  room.on(
    JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,
    handleParticipantsUpdate,
  );
  room.on(
    JitsiMeetJS.events.conference.TRACK_ADDED,
    handleParticipantsUpdate,
  );
  room.on(
    JitsiMeetJS.events.conference.TRACK_REMOVED,
    handleParticipantsUpdate,
  );

  setTimeout(reRender, 1000);
}

connection.addEventListener(
  JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
  handleRoomJoin,
);

connection.addEventListener(
  JitsiMeetJS.events.connection.CONNECTION_FAILED,
  () => { alert('connection failed'); },
);

JitsiMeetJS.mediaDevices.addEventListener(
  JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED,
  handleDeviceListChanged,
);

connection.connect();

export default function MeetRoom() {
  const [, forceUpdate] = useReducer((c) => c + 1, 0);
  const [listen, setListen] = useState('none');

  useEffect(() => {
    reRender = forceUpdate;
    (async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        await handleDeviceListChanged();
      } catch (error) {
        alert(error.message);
      }
    })();
    return () => { reRender = () => {}; };
  }, []);

  if (room === null) {
    return <div />;
  }

  if (room.displayNmae === undefined) {
    return (
      <Lobby
        webcams={webcams}
        microphones={microphones}
        speakers={speakers}
        onSubmit={(input) => {
          setWebcamTrack(input.webcam || _.get(webcams, [0, 'deviceId']));
          setMicrophoneTrack(input.microphone);
          setSpeaker(input.speaker);
          room.displayNmae = input.displayNmae;
          room.setDisplayName(input.displayNmae);
          const [, target] = /^(chinese|cantonese)/.exec(input.displayNmae);
          setListen(target);
          handleParticipantsUpdate();
        }}
      />
    );
  }

  return (
    <Room participants={participants} listen={listen} />
  );
}
