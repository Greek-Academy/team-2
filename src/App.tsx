import React from "react"
import "./App.scss"
import { ChatBox } from "./components/ChatBox"
import { Calculator } from "./components/Calculator"

const App: React.FC = () => {
  return (
    <div className="app">
      <Calculator />
      <ChatBox />
    </div>
  )
}

export default App
