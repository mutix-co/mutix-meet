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

const Form = styled.form`
  display: flex;
  flex-direction: column;

  & > * {
    margin: 8px 0;
  }

  & > select {
    padding: 10px;
  }

  & > button {
    padding: 10px;
  }
`;

export default function Lobby(): JSX.Element {
  const router = useRouter();
  const [webcams, setWebcams] = useState([]);
  const [microphones, setMicrophones] = useState([]);

  useEffect(() => {
    AgoraSDK.getDevices(async (devices) => {
      const microphones = [];
      const webcams = [];

      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      devices
        .forEach((device) => {
          if (device.kind === 'audioinput') {
            microphones.push({
              name: device.label || `microphone-${microphones.length}`,
              value: device.deviceId,
              kind: device.kind,
            });
          }
          if (device.kind === 'videoinput') {
            webcams.push({
              name: device.label || `webcams-${microphones.length}`,
              value: device.deviceId,
              kind: device.kind,
            });
          }
        });

      console.log("microphones", microphones);
      console.log("webcams", webcams);
      
      setMicrophones(microphones);
      setWebcams(webcams);
    });
  }, []);

  return (
    <div>
    <Formik
      initialValues={{ microphone: '', webcam: '' }}
      validationSchema={schema}
      onSubmit={async (input, { setSubmitting }) => {
        setSubmitting(false);
        console.log(input);
        router.push({
          pathname: '/chat',
          query: input,
        });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <fieldset>
          <legend>Register</legend>
          <Form onSubmit={handleSubmit}>
            <label htmlFor="microphone">Microphone</label>
            <select 
              id="microphone"
              type="microphone"
              name="microphone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.microphone}
            >
              <option value="">Select Microphone</option>
              {microphones.map(item => <option key={item.name} value={item.value} label={item.name} />)}
            </select>
            {errors.microphone && touched.microphone && errors.microphone}
            <label htmlFor="webcam">Webcam</label>
            <select 
              id="webcam"
              type="webcam"
              name="webcam"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.webcam}
            >
              <option value="">Select Webcam</option>
              {webcams.map(item => <option key={item.name} value={item.value} label={item.name} />)}
            </select>
            {errors.webcam && touched.webcam && errors.webcam}
            <button type="submit" disabled={isSubmitting}>Join Channel</button>
          </Form>
        </fieldset>
      )}
    </Formik>
    </div>
  );
}
