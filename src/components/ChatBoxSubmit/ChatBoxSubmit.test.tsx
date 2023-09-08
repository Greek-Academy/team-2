import { render, fireEvent } from "@testing-library/react"
import { ChatBoxSubmit } from "./ChatBoxSubmit"
import "@testing-library/jest-dom/extend-expect"

// イベント発火検証用のダミー関数
window.alert = jest.fn()
const mockFunc = (v: string): void => {
  window.alert(v)
}

describe("ChatBoxSubmit", () => {
  it("recoding true, label 録音ボタン", () => {
    const { getByText, getByTestId } = render(
      <ChatBoxSubmit recoding={true} message="msg" clickHandle={mockFunc} />
    )
    expect(getByText("◉")).toBeInTheDocument()
    expect(getByTestId("button")).toBeDisabled()
  })
  it("recoding false, label 再生ボタン, check click event", () => {
    const { getByText, getByTestId } = render(
      <ChatBoxSubmit recoding={false} message="msg" clickHandle={mockFunc} />
    )
    expect(getByText("▶")).toBeInTheDocument()

    // click eventの発火確認
    fireEvent.click(getByTestId("button"))
    expect(window.alert).toHaveBeenCalledWith("msg")
  })
})
