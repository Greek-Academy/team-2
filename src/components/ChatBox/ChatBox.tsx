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
import { ChatBoxSubmit } from "../ChatBoxSubmit/ChatBoxSubmit.tsx"
import { RecognitionSwitch } from "../RecognitionSwitch/RecognitionSwitch.tsx"

interface IChatBoxProps {}

export const ChatBox: FC<IChatBoxProps> = () => {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [recoding, setRecoding] = useState(false)
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

  const commands = [
    {
      command: "スタート",
      matchInterim: true,
      callback: () => {
        if (recoding) {
          return
        }
        console.log("録音開始")
        resetTranscript()
        setRecoding(true)
      },
    },
    {
      command: "ストップ",
      matchInterim: true,
      callback: () => {
        if (!recoding) {
          return
        }
        setRecoding(false)
        console.log("録音終了")
        const input = transcript.replace("/(*.)ストップ$/u", "$1")
        console.log(input)
        processThought(input)
        resetTranscript()
      },
    },
  ]

  const { transcript, listening, resetTranscript } = useSpeechRecognition({
    commands,
  })

  // メッセージが追加されたら、一番最新のメッセージの箇所までスクロールする
  const scrollToCurrentChatBox = () => {
    const chatBoxBody = document.querySelector<HTMLElement>("#chatBoxBody")
    if (chatBoxBody !== null) {
      chatBoxBody.scrollTo(0, chatBoxBody.scrollHeight)
    }
  }

  // 音声認識APIのON/OFF切り替え
  const recognitionHandle = () => {
    if (listening) {
      stopSpeech()
    } else {
      startSpeech()
    }
  }

  const speechHandle = async () => {
    setRecoding(!recoding)
  }

  const startSpeech = async () => {
    resetTranscript()
    await SpeechRecognition.startListening({
      continuous: true,
    })
  }

  const stopSpeech = async () => {
    await SpeechRecognition.stopListening()
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

  const inputEl = recoding ? (
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
      readOnly={recoding}
      value={message}
      disabled={loading}
      onChange={(e) => setMessage(e.target.value)}
    />
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
      <RecognitionSwitch
        listening={listening}
        disabled={recoding}
        recognitionHandle={recognitionHandle}
      />
      <section className="chat-box-header">
        <button
          type="button"
          disabled={!listening}
          className={recoding ? "speech-btn rec" : "speech-btn wait"}
          onClick={speechHandle}
        >
          {recoding ? "音声入力 終了 ■" : "音声入力 開始 ◉"}
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
        <MicIcon visible={recoding} />
      </section>
      <section className="chat-box-footer">
        {inputEl}
        <ChatBoxSubmit
          listening={listening}
          message={message}
          clickHandle={processThought}
        />
      </section>

      <Spinner visible={loading} />
    </div>
  )
}
