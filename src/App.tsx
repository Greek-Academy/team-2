import React from 'react'
import './App.scss'
import {Calculator} from "./components/Calculator";
import {SpeechRecognitionComponent} from "./components/SpeechRecognitionComponent";

const App: React.FC = () => {
    return (
        <div className="app">
            <Calculator/>
            <SpeechRecognitionComponent/>
        </div>
    )
}

export default App
