/* eslint-disable jsx-a11y/media-has-caption */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid #ccc;
  width: 33%;
  height: 260px;
  margin-top: 5px;

  ${({ disabled }) => disabled && `
    height: 0;
    border: none;
  `}
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

export default function Participant({ participant, muted, disabled }) {
  const videoRef = useRef();
  const audioRef = useRef();

  if (participant !== null) {
    const video = participant.getTracksByMediaType('video')[0];
    const audio = participant.getTracksByMediaType('audio')[0];
    if (video !== undefined && disabled !== true && videoRef.current !== undefined) {
      video.attach(videoRef.current);
    }
    if (audio !== undefined && participant.isMyself !== true && audioRef.current !== undefined) {
      audio.attach(audioRef.current);
    }
  }

  return (
    <Wrapper disabled={disabled}>
      <Video ref={videoRef} autoPlay />
      <audio ref={audioRef} autoPlay muted={muted} />
    </Wrapper>
  );
}

Participant.propTypes = {
  participant: PropTypes.shape({
    getTracksByMediaType: PropTypes.func,
    isMyself: PropTypes.bool,
  }),
  muted: PropTypes.bool,
  disabled: PropTypes.bool,
};

Participant.defaultProps = {
  participant: null,
  muted: true,
  disabled: false,
};
