import { useSpeaker } from "./useSpeaker"

class SpeechSynthesisUtterance {
  public text?: string
}

// SpeechSynthesisが使用できないケースの検証
const unsetMock = () => {
  interface Window {
    speechSynthesis?: SpeechSynthesis
  }
  delete (window as Window).speechSynthesis
}

// SpeechSynthesisのモック準備
const setMock = () => {
  const windowSpy = jest.spyOn(window, "window", "get")
  windowSpy.mockImplementation(
    () =>
      ({
        speechSynthesis: { speak: jest.fn() },
        SpeechSynthesisUtterance,
      } as unknown as Window & typeof globalThis)
  )
}

describe("useSpeaker", () => {
  it("state is false", () => {
    unsetMock()
    const { state } = useSpeaker()
    expect(state).toBeFalsy()
  })

  it("state is true, called speechSynthesis in speak", () => {
    setMock()
    const { state, handlePlay } = useSpeaker()
    expect(state).toBeTruthy()

    const expected = new SpeechSynthesisUtterance()
    expected.text = "message"
    const actual = handlePlay("message")
    expect(actual).toBeTruthy()
  })
})
