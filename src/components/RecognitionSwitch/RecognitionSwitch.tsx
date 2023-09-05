import { FC } from "react"
import "./RecognitionSwitch.scss"

interface IRecognitionSwitchProps {
  listening: boolean
  disabled: boolean
  recognitionHandle: () => void
}

export const RecognitionSwitch: FC<IRecognitionSwitchProps> = ({
  listening,
  disabled,
  recognitionHandle,
}) => {
  return (
    <div
      className={`recognition-switch ${disabled ? "disabled" : ""}`}
      onClick={recognitionHandle}
      data-testid="toggle"
    >
      <input
        type="checkbox"
        onChange={() => (listening = !listening)}
        checked={listening}
      />
      <label>{listening ? "ON" : "OFF"}</label>
    </div>
  )
}
