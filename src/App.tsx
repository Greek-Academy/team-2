import React from 'react'
import './App.scss'
import {ChatBox} from "./components/ChatBox";

const App: React.FC = () => {
    return (
        <div className="app">
            <ChatBox />
        </div>
    )
}

export default App
