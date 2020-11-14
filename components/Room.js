import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Participant from './Participant';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #2c3e50;
`;

const Participants = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 10px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Footer = styled.div`
  width: 100%;
  height: 100%;
  border-top: 2px solid #333;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 0 10px;
  padding-bottom: 20px;
  color: #eee;
`;

const Information = styled.div`
`;

const Iframe = styled.iframe`
  width: 300px;
  height: 100%;
`;

const QRCode = styled.img`
  height: 160px;
`;

export default function Room({
  participants, listen,
}) {
  return (
    <Wrapper>
      <Screen>
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
        <Footer>
          <Information><QRCode src="/slido.svg" alt="slido" /></Information>
          <Information>IATC TW 2020 年度論壇 國際連線直播場次 -【從新文本到廣東話音樂劇，鏡向反射的形式翻譯】</Information>
          <Information>技術支持 mutix Co., Ltd.</Information>
        </Footer>
      </Screen>
      <Iframe title="slido" src="https://wall.sli.do/event/2rqlgtgo" frameBorder="0" />
    </Wrapper>
  );
}

Room.propTypes = {
  participants: PropTypes.shape().isRequired,
  listen: PropTypes.string.isRequired,
};
