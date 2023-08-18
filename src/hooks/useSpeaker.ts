export const useSpeaker = () => {
  const state = "speechSynthesis" in window
  const handlePlay = (text: string | number) => {
    const uttr = new SpeechSynthesisUtterance()
    uttr.text = String(text)

    window.speechSynthesis.speak(uttr)
  }
  return { state, handlePlay }
}
