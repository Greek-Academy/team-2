import { FC } from "react"
import "./ChatBoxInput.scss"

interface IChatBoxInputProps {
  recoding: boolean
  loading: boolean
  transcript: string
  message: string
  changeHandle: (v: string) => void
}

export const ChatBoxInput: FC<IChatBoxInputProps> = ({
  recoding,
  loading,
  transcript,
  message,
  changeHandle,
}) => {
  return recoding ? (
    <input
      type="text"
      data-testid="input"
      readOnly
      value={transcript}
      className="chat-box-input"
      style={{ pointerEvents: "none" }}
    />
  ) : (
    <input
      type="text"
      data-testid="input"
      className="chat-box-input"
      value={message}
      disabled={loading}
      onChange={(e) => changeHandle(e.target.value)}
    />
  )
}
