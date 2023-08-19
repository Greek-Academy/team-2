import "regenerator-runtime";
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const SpeechRecognitionComponent: React.FC = () => {

  // 指定の音声が入力された際に発火させるイベント
  const commands = [
    {
      command: '開始',
      callback: () => {
        console.log('録音開始')
        resetTranscript()
      },
    },
    {
      command: '終了',
      callback: () => {
        console.log(transcript)
        console.log('録音終了')
        resetTranscript()
      },
    },
  ];

  const { transcript, listening,  resetTranscript } = useSpeechRecognition({ commands });

  const startSpeech = () => SpeechRecognition.startListening({
    continuous: true
  });

  const stopSpeech = () => SpeechRecognition.stopListening();

  return (
    <div>
      <p>Transcript: {transcript}</p>
      <p>Listening: {listening ? 'true' : 'false'}</p>
      <button onClick={startSpeech}>開始</button>
      <button onClick={stopSpeech}>終了</button>
    </div>
  );
}