import { FC } from "react"
import "./ChatBoxSubmit.scss"

interface IChatBoxSubmitProps {
  recoding: boolean
  message: string
  clickHandle: (v: string) => void
}

export const ChatBoxSubmit: FC<IChatBoxSubmitProps> = ({
  recoding,
  message,
  clickHandle,
}) => {
  return recoding ? (
    <button
      type="button"
      data-testid="button"
      className="chat-box-submit"
      disabled
    >
      ◉
    </button>
  ) : (
    <button
      type="button"
      data-testid="button"
      className="chat-box-submit"
      onClick={() => clickHandle(message)}
    >
      ▶
    </button>
  )
}
