import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid #ccc;
  width: 32%;
  height: 40vh;
  margin: 1.5vh 0;

  ${({ disabled }) => disabled && `
    height: 0;
    border: none;
  `}
`;

export default function Participant({ participant, muted, disabled }) {
  const videoRef = useRef();
  const audioRef = useRef();
  if (participant !== null) {
    const video = participant.getTracksByMediaType('video');
    const audio = participant.getTracksByMediaType('audio');
  }

  return (
    <Wrapper disabled={disabled}>
      <video ref={videoRef} autoPlay='1' />
      <audio ref={audioRef} autoPlay='1' />
    </Wrapper>
  );
}

Participant.propTypes = {
  participant: PropTypes.shape({
    getTracksByMediaType: PropTypes.func,
  }),
  muted: PropTypes.bool,
  disabled: PropTypes.bool,
};

Participant.defaultProps = {
  participant: null,
  muted: true,
  disabled: false,
};
