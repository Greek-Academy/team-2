import { render } from "@testing-library/react"
import { ChatBoxSubmit } from "./ChatBoxSubmit"
import "@testing-library/jest-dom/extend-expect"

const mockFunc = (m: string): void => {
  console.log(m)
}

describe("ChatBoxSubmit", () => {
  it("recoding TRUE CASE : 録音ボタン", () => {
    const { getByText, getByTestId } = render(
      <ChatBoxSubmit recoding={true} message="ok" clickHandle={mockFunc} />
    )
    expect(getByText("◉")).toBeInTheDocument()
    expect(getByTestId("button")).toBeDisabled()
  })
  it("recoding FALSE CASE : 再生ボタン", () => {
    const { getByText } = render(
      <ChatBoxSubmit recoding={false} message="ok" clickHandle={mockFunc} />
    )
    expect(getByText("▶")).toBeInTheDocument()
  })
})
