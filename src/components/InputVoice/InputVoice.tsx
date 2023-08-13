import { FC } from 'react';
import './InputVoice.scss';

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface ICalculatorKeyProps {
}

const {
  transcript,
  listening,
  resetTranscript,
  browserSupportsSpeechRecognition,
} = useSpeechRecognition();




export const CalculatorKey: FC<ICalculatorKeyProps> = () => (

  <div>
    {
      !browserSupportsSpeechRecognition
      ? <span>ブラウザが音声認識未対応です</span>
      : <div id="react-speech-recognition">
          <p>入力: {listening ? "on" : "off"}</p>
          <button type="button" onClick={() => SpeechRecognition.startListening()}>
            入力開始
          </button>
          <button type="button" onClick={() => SpeechRecognition.stopListening()}>
            Stop
          </button>
          <button type="button" onClick={() => resetTranscript()}>
            リセット
          </button>
          <p>{transcript}</p>
        </div>
    }
  </div>

  
  
  
);
