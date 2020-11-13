import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Participant from './Participant';

const Participants = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default function Room({
  participants, listen,
}) {
  console.log(participants);
  return (
    <Participants>
      <Participant participant={participants['cantonese-1-cantonese']} muted={listen !== 'cantonese'} />
      <Participant participant={participants['cantonese-2-cantonese']} muted={listen !== 'cantonese'} />
      <Participant participant={participants['chinese-3-chinese']} muted={listen !== 'chinese'} />
      <Participant participant={participants['chinese-4-chinese']} muted={listen !== 'chinese'} />
      <Participant participant={participants['cantonese-5-cantonese']} muted={listen !== 'cantonese'} />
      <Participant participant={participants['cantonese-6-cantonese']} muted={listen !== 'cantonese'} />
      <Participant participant={participants['cantonese-interpretation-chinese']} muted={listen !== 'chinese'} disabled />
      <Participant participant={participants['chinese-interpretation-cantonese']} muted={listen !== 'cantonese'} disabled />
    </Participants>
  );
}

Room.propTypes = {
  participants: PropTypes.shape().isRequired,
  listen: PropTypes.string.isRequired,
};
