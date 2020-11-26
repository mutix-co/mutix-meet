import React, { useState, useEffect } from 'react';
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
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 10px;
  padding-bottom: 20px;
  color: #eee;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  flex: 1;
`;

const Iframe = styled.iframe`
  width: 300px;
  height: 100%;
`;

const QRCode = styled.img`
  height: 160px;
`;

const Switch = styled.div`
  display: flex;
  margin-bottom: 36px;
  overflow: hidden;

  & input {
    position: absolute !important;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    width: 1px;
    border: 0;
    overflow: hidden;

    &:checked + label {
      background-color: #a5dc86;
      box-shadow: none;
    }
  }

  & label {
    background-color: #e4e4e4;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    line-height: 1;
    text-align: center;
    padding: 8px 16px;
    margin-right: -1px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
    transition: all 0.1s ease-in-out;

    &:hover {
      cursor: pointer;
    }

    &:first-of-type {
      border-radius: 4px 0 0 4px;
    }

    &:last-of-type {
      border-radius: 0 4px 4px 0;
    }
  }
`;

export default function Room({
  participants,
}) {
  const [listen, setListen] = useState('all');

  const onLanguageChange = (evt) => setListen(evt.target.value);

  useEffect(() => {
    window.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 49) {
        setListen('all');
        return;
      }
      if (evt.keyCode === 50) {
        setListen('chinese');
        return;
      }
      if (evt.keyCode === 51) {
        setListen('cantonese');
        return;
      }
    });
  });

  return (
    <Wrapper>
      <Screen>
        <Participants>
          <Participant participant={participants['cantonese-1-cantonese']} muted={['cantonese', 'all'].indexOf(listen) === -1} />
          <Participant participant={participants['cantonese-2-cantonese']} muted={['cantonese', 'all'].indexOf(listen) === -1} />
          <Participant participant={participants['chinese-3-chinese']} muted={['chinese', 'all'].indexOf(listen) === -1} />
          <Participant participant={participants['chinese-4-chinese']} muted={['chinese', 'all'].indexOf(listen) === -1} />
          <Participant participant={participants['cantonese-5-cantonese']} muted={['cantonese', 'all'].indexOf(listen) === -1} />
          <Participant participant={participants['cantonese-6-cantonese']} muted={['cantonese', 'all'].indexOf(listen) === -1} />
          <Participant participant={participants['cantonese-interpretation-chinese']} muted={['chinese', 'all'].indexOf(listen) === -1} disabled />
          <Participant participant={participants['chinese-interpretation-cantonese']} muted={['cantonese', 'all'].indexOf(listen) === -1} disabled />
        </Participants>
        <Footer>
          <Switch onChange={onLanguageChange}>
            <input type="radio" id="language-all" name="language" value="all" checked={listen === 'all'} />
            <label htmlFor="language-all">全</label>
            <input type="radio" id="language-chinese" name="language" value="chinese" checked={listen === 'chinese'} />
            <label htmlFor="language-chinese">華語</label>
            <input type="radio" id="language-cantonese" name="language" value="cantonese" checked={listen === 'cantonese'} />
            <label htmlFor="language-cantonese">粵語</label>
          </Switch>
          <Information>
            <div><QRCode src="/slido.svg" alt="slido" /></div>
            <div>IATC TW 2020 年度論壇 國際連線直播場次 -【從新文本到廣東話音樂劇，鏡向反射的形式翻譯】</div>
            <div>技術支持 mutix Co., Ltd.</div>
          </Information>
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
