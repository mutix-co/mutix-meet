import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Formik } from 'formik';
import styled from 'styled-components';

const schema = yup.object().shape({
  microphone: yup.string().required(),
  webcam: yup.string(),
});

const Form = styled.form`
  display: flex;
  flex-direction: column;

  & > * {
    margin: 8px 0;
  }

  & > select {
    padding: 10px;
  }
`;

const Fieldset = styled.fieldset`
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 2px;
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & button {
    width: 30%;
    padding: 10px;
    margin: 5px 0;
  }

  & div {
    width: 30%;
  }
`;

const Error = styled.div`
  color: #e74c3c;
`;

export default function Lobby({
  webcams, microphones, speakers, onSubmit,
}) {
  return (
    <div>
      <Formik
        initialValues={{ webcam: '', microphone: 'default', speaker: 'default' }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
        }) => (
          <Fieldset>
            <legend>Register</legend>
            <Form onSubmit={(evt) => {
              const { name, value } = evt.nativeEvent.submitter;
              setFieldValue(name, value);
              return handleSubmit(evt);
            }}
            >
              <label htmlFor="webcam">
                <div>Webcam</div>
                <Select
                  id="webcam"
                  type="webcam"
                  name="webcam"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.webcam}
                  disabled={isSubmitting}
                >
                  {webcams.map((item) => (
                    <option key={item.deviceId} value={item.deviceId} label={item.label} />
                  ))}
                </Select>
                <Error>{errors.webcam && touched.webcam && errors.webcam}</Error>
              </label>
              <label htmlFor="microphone">
                <div>Microphone</div>
                <Select
                  id="microphone"
                  type="microphone"
                  name="microphone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.microphone}
                  disabled={isSubmitting}
                >
                  {microphones.map((item) => (
                    <option key={item.deviceId} value={item.deviceId} label={item.label} />
                  ))}
                </Select>
                <Error>{errors.microphone && touched.microphone && errors.microphone}</Error>
              </label>
              <label htmlFor="speaker">
                <div>Speaker</div>
                <Select
                  id="speaker"
                  type="speaker"
                  name="speaker"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.speaker}
                  disabled={isSubmitting}
                >
                  {speakers.map((item) => (
                    <option key={item.deviceId} value={item.deviceId} label={item.label} />
                  ))}
                </Select>
                <Error>{errors.speaker && touched.speaker && errors.speaker}</Error>
              </label>
              <Buttons>
                <button type="submit" name="displayNmae" value="cantonese-1-cantonese" disabled={isSubmitting}>講者(港) - 岑偉宗</button>
                <button type="submit" name="displayNmae" value="cantonese-2-cantonese" disabled={isSubmitting}>講者(澳) - 譯智泉</button>
                <button type="submit" name="displayNmae" value="chinese-3-chinese" disabled={isSubmitting}>講者(台) - 吳政翰</button>
                <button type="submit" name="displayNmae" value="chinese-4-chinese" disabled={isSubmitting}>主持人 - 吳思鋒</button>
                <button type="submit" name="displayNmae" value="cantonese-5-cantonese" disabled={isSubmitting}>列席(港) - 陳國慧</button>
                <button type="submit" name="displayNmae" value="cantonese-6-cantonese" disabled={isSubmitting}>列席(澳) - 莫兆忠</button>
                <button type="submit" name="displayNmae" value="interpretation-chinese" disabled={isSubmitting}>口譯（粵 to 華）</button>
                <button type="submit" name="displayNmae" value="interpretation-cantonese" disabled={isSubmitting}>口譯（華 to 粵）</button>
                <div />
                <button type="submit" name="displayNmae" value="viewer" disabled={isSubmitting}>聽眾</button>
                <div />
              </Buttons>
            </Form>
          </Fieldset>
        )}
      </Formik>
    </div>
  );
}

Lobby.propTypes = {
  webcams: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  microphones: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  speakers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
