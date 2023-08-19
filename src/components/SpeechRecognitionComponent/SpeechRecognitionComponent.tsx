import "regenerator-runtime";
import {useState} from "react";
import {SpeakerButton} from "../SpeakerButton";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import {useSpeaker} from "../../hooks/useSpeaker.ts";

export const SpeechRecognitionComponent = () => {
    const [result, setResult] = useState("");
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const {handlePlay} = useSpeaker();
    const processThought = async (msg: string) => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/agents/conversation", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: msg
                })
            });

            if (response.ok) {
                const data = await response.json();
                setResult(data.result);
                handlePlay(data.result)
            } else {
                console.error("Failed to fetch data");
                setResult("Error in processing request");
            }
        } catch (error) {
            console.error("There was an error:", error);
            setResult("Error in processing request");
        } finally {
            setLoading(false); // Set loading to false when fetch completes
        }
    }


    // 指定の音声が入力された際に発火させるイベント
    // const commands = [
    //     {
    //         command: 'スタート',
    //         callback: () => {
    //             console.log('録音開始')
    //             resetTranscript()
    //         },
    //     },
    //     {
    //         command: 'ストップ',
    //         callback: () => {
    //             console.log(transcript)
    //             console.log('録音終了')
    //             resetTranscript()
    //         },
    //     },
    // ];

    // const {transcript, listening, resetTranscript} = useSpeechRecognition({commands});

    const {transcript, listening, resetTranscript} = useSpeechRecognition();

    const startSpeech = async () => {
        resetTranscript();
        await SpeechRecognition.startListening({
            continuous: true
        });
    }

    const stopSpeech = async () => {
        await SpeechRecognition.stopListening();
        await processThought(transcript);
    }


    return (
        <div style={{border: "1px solid black", width: "300px", height: "100%"}}>

            <h1>入力</h1>
            <input
                type="text"
                value={message}
                placeholder="メッセージを入力"
                onChange={e => setMessage(e.target.value)}
                style={{width: "100%"}}
            />
            <div>
                <p>Transcript: {transcript}</p>
                <p>Listening: {listening ? 'true' : 'false'}</p>
                <button onClick={startSpeech}>開始</button>
                <button onClick={stopSpeech}>終了</button>
            </div>
            <br/>

            <button onClick={() => processThought(message)}>処理する</button>

            <h1>出力</h1>
            {loading ? <p>Loading...</p> : <p>{result}</p>}

            <SpeakerButton stringToRead={result}/>
        </div>
    );
};
