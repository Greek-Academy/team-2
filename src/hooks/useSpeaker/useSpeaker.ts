export const useSpeaker = () => {
  const state = "speechSynthesis" in window
  const handlePlay = (text: string | number): boolean => {
    const uttr = new window.SpeechSynthesisUtterance()
    uttr.text = String(text)

    window.speechSynthesis.speak(uttr)
    return true
  }
  return { state, handlePlay }
}
