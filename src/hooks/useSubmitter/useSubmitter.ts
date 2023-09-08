enum InputTypes {
  enter = "Enter",
}

export const useSubmitter = (callApi: (v: string) => void) => {
  // 「⌘ + enter」 or 「ctrl + enter」 で 送信
  const handleKeyDown = (e: KeyboardEvent, value: string): boolean => {
    // Enterではない or 文字入力途中 であれば処理スキップ
    if (e.key !== InputTypes.enter || e.isComposing) {
      return false
    }

    // "⌘" or "ctrl" が押されていなければ処理スキップ
    if (!e.metaKey && !e.ctrlKey) {
      return false
    }

    e.preventDefault()
    callApi(value)
    return true
  }
  return { handleKeyDown }
}
