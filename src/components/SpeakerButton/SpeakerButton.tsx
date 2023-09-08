import { useSpeaker } from "../../hooks/useSpeaker/useSpeaker"

export type SpeakerButtonProps = {
  stringToRead?: string
}
export const SpeakerButton = (props: SpeakerButtonProps) => {
  const { state, handlePlay } = useSpeaker()
  const disabled = !state || !props.stringToRead

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => handlePlay(props.stringToRead || "テスト")}
    >
      {disabled ? "音声出力非対応" : "音声テスト"}
    </button>
  )
}
