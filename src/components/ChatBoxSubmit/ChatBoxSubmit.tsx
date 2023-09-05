import { FC } from "react"
import "./ChatBoxSubmit.scss"

interface IChatBoxSubmitProps {
  listening: boolean
  message: string
  clickHandle: (v: string) => void
}

export const ChatBoxSubmit: FC<IChatBoxSubmitProps> = ({
  listening,
  message,
  clickHandle,
}) => {
  return listening ? (
    <button type="button" className="chat-box-submit" disabled>
      ◉
    </button>
  ) : (
    <button
      type="button"
      className="chat-box-submit"
      onClick={() => clickHandle(message)}
    >
      ▶
    </button>
  )
}
