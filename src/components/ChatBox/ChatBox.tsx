import { FC, useEffect } from "react"
import "./ChatBox.scss"
import "regenerator-runtime"
import { useState } from "react"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"
import { useSpeaker } from "../../hooks/useSpeaker.ts"
import { messageHistoryType } from "../../types/index.ts"
import { Spinner } from "../Spinner/Spinner.tsx"
import { MicIcon } from "../MicIcon/MicIcon.tsx"

interface IChatBoxProps {}

export const ChatBox: FC<IChatBoxProps> = () => {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [messageHistories, setMessageHistories] = useState<
    messageHistoryType[]
  >([])
  const { handlePlay } = useSpeaker()

  const processThought = async (msg: string) => {
    if (!msg) {
      return
    }
    addHistoryMessage("input", msg)
    resetMessage()
    setLoading(true)
    try {
      const response = await fetch(
        "http://localhost:8000/agents/conversation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: msg,
          }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        handlePlay(data.result)
        addHistoryMessage("output", data.result)
      } else {
        console.error("Failed to fetch data")
        addHistoryMessage("output", "Error in processing request")
      }
    } catch (error) {
      console.error("There was an error:", error)
      addHistoryMessage("output", "Error in processing request")
    } finally {
      setLoading(false) // Set loading to false when fetch completes
    }
  }

  const { transcript, listening, resetTranscript } = useSpeechRecognition()

  // メッセージが追加されたら、一番最新のメッセージの箇所までスクロールする
  const scrollToCurrentChatBox = () => {
    const chatBoxBody = document.querySelector<HTMLElement>("#chatBoxBody")
    if (chatBoxBody !== null) {
      chatBoxBody.scrollTo(0, chatBoxBody.scrollHeight)
    }
  }

  const speechHandle = async () => {
    if (listening) {
      stopSpeech()
    } else {
      startSpeech()
    }
  }

  const startSpeech = async () => {
    resetTranscript()
    await SpeechRecognition.startListening({
      continuous: true,
    })
  }

  const stopSpeech = async () => {
    await SpeechRecognition.stopListening()
    console.log(transcript)
    if (transcript) {
      postMessage(transcript)
      await processThought(transcript)
    }
  }

  const resetMessage = () => {
    setMessage("")
  }

  const addHistoryMessage = (type: "input" | "output", text: string) => {
    setMessageHistories((prev) => [
      ...prev,
      {
        type,
        text,
      },
    ])
  }

  const inputEl = listening ? (
    <input
      type="text"
      readOnly
      value={transcript}
      className="chat-box-input"
      style={{ pointerEvents: "none" }}
    />
  ) : (
    <input
      type="text"
      className="chat-box-input"
      readOnly={listening}
      value={message}
      disabled={loading}
      onChange={(e) => setMessage(e.target.value)}
    />
  )

  const submitEl = listening ? (
    <button type="button" className="chat-box-submit" disabled>
      ◉
    </button>
  ) : (
    <button
      type="button"
      className="chat-box-submit"
      onClick={() => processThought(message)}
    >
      ▶
    </button>
  )

  // 「⌘ + enter」 or 「ctrl + enter」 で 送信
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
        // 文字入力途中であれば処理スキップ
        if (e.isComposing) {
          break
        }
        if ((e.metaKey || e.ctrlKey) && message) {
          e.preventDefault()
          processThought(message)
        }
        break

      default:
        break
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    scrollToCurrentChatBox()
  }, [addHistoryMessage])

  return (
    <div className="chat-box">
      <section className="chat-box-header">
        <button
          type="button"
          className={listening ? "speech-btn rec" : "speech-btn wait"}
          onClick={speechHandle}
        >
          {listening ? "音声入力 終了 ■" : "音声入力 開始 ◉"}
        </button>
      </section>
      <section className="chat-box-body" id="chatBoxBody">
        {messageHistories.map((messageHistory, index) => {
          return (
            <div className={messageHistory.type} key={index}>
              <div className="chat-box-message">{messageHistory.text}</div>
            </div>
          )
        })}
        <MicIcon visible={listening} />
      </section>
      <section className="chat-box-footer">
        {inputEl}
        {submitEl}
      </section>

      <Spinner visible={loading} />
    </div>
  )
}
