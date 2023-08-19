export const useSpeaker = () => {
  const state = "speechSynthesis" in window
  const handlePlay = (text: string | number) => {
    // const voices = window.speechSynthesis.getVoices();
    // const japaneseVoice = voices.find(voice => voice.lang === 'ja-JP');
    //
    // if (!japaneseVoice) {
    //   console.error("Japanese voice not found.");
    //   return;
    // }

    const uttr = new SpeechSynthesisUtterance()

    // uttr.voice = japaneseVoice
    uttr.text = String(text)

    window.speechSynthesis.speak(uttr)
  }
  return { state, handlePlay }
}
