import { FC, useEffect } from "react"
import "./ChatBox.scss"
import "regenerator-runtime"
import { useState } from "react"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"
import { messageHistoryType } from "../../types/index.ts"
import { Spinner } from "../Spinner/Spinner.tsx"
import { MicIcon } from "../MicIcon/MicIcon.tsx"
import { ChatBoxSubmit } from "../ChatBoxSubmit/ChatBoxSubmit.tsx"
import { RecognitionSwitch } from "../RecognitionSwitch/RecognitionSwitch.tsx"
import { ChatBoxInput } from "../ChatBoxInput/ChatBoxInput.tsx"
import { useSubmitter, useSpeaker } from "../../hooks/index.ts"
import { ChatGpt } from "../../api/ChatGpt/ChatGpt.ts"

interface IChatBoxProps {}

enum CommandTypes {
  start = "スタート",
  stop = "ストップ",
}

export const ChatBox: FC<IChatBoxProps> = () => {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [recoding, setRecoding] = useState(false)
  const [messageHistories, setMessageHistories] = useState<
    messageHistoryType[]
  >([])

  const api = ChatGpt.makeInstance()

  const processThought = async (msg: string) => {
    if (!msg) {
      return
    }
    addHistoryMessage("input", msg)
    resetMessage()
    setLoading(true)
    try {
      const response = await api.conversation(msg)

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

  const { handlePlay } = useSpeaker()
  const { handleKeyDown } = useSubmitter(processThought)

  const commands = [
    {
      command: CommandTypes.start,
      matchInterim: true,
      callback: () => {
        if (recoding) {
          return
        }
        resetTranscript()
        setRecoding(true)
      },
    },
    {
      command: CommandTypes.stop,
      matchInterim: true,
      callback: (command: string) => {
        if (!recoding) {
          return
        }
        setRecoding(false)
        const input = transcript.replace("/(*.)" + command + "$/u", "$1")
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

  const handleKeyDownHook = (e: KeyboardEvent) => {
    if (message.length <= 0) {
      return
    }
    handleKeyDown(e, message)
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDownHook)
    return () => document.removeEventListener("keydown", handleKeyDownHook)
  }, [handleKeyDownHook])

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
        <ChatBoxInput
          recoding={recoding}
          loading={loading}
          transcript={transcript}
          message={message}
          changeHandle={setMessage}
        />
        <ChatBoxSubmit
          recoding={recoding}
          message={message}
          clickHandle={processThought}
        />
      </section>

      <Spinner visible={loading} />
    </div>
  )
}
