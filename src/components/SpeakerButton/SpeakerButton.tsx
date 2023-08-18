import { useSpeaker } from "../../hooks/useSpeaker";

export const SpeakerButton = () => {
  const { state, handlePlay } = useSpeaker();
  const disabled = !state;

   return (
    <button type="button" disabled={disabled} onClick={() => handlePlay('テスト')}>{disabled ? '音声出力非対応' : '音声テスト'}</button>
  );
};
