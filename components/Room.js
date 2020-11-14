import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Participant from './Participant';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const Participants = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
  background-color: #2c3e50;
`;

const Iframe = styled.iframe`
  width: 300px;
  height: 100%;
`;

export default function Room({
  participants, listen,
}) {
  return (
    <Wrapper>
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
      <Iframe title="slido" src="https://wall.sli.do/event/2rqlgtgo" frameBorder="0" />
    </Wrapper>
  );
}

Room.propTypes = {
  participants: PropTypes.shape().isRequired,
  listen: PropTypes.string.isRequired,
};
