import { render, fireEvent } from "@testing-library/react"
import { ChatBoxInput } from "./ChatBoxInput"
import "@testing-library/jest-dom/extend-expect"

// イベント発火検証用のダミー関数
window.alert = jest.fn()
const mockFunc = (m: string): void => {
  window.alert(m)
}

describe("ChatBoxInput", () => {
  it("recoding true", () => {
    const { getByTestId } = render(
      <ChatBoxInput
        recoding={true}
        loading={true}
        message="msg"
        transcript="tran"
        changeHandle={mockFunc}
      />
    )
    const inputEl = getByTestId("input")
    expect(inputEl).toHaveValue("tran")
    expect(inputEl).toHaveAttribute("readonly")
    expect(inputEl).toHaveStyle("pointer-events: none;")
  })

  it("recoding false, loading true", () => {
    const { getByTestId } = render(
      <ChatBoxInput
        recoding={false}
        loading={true}
        message="msg"
        transcript="tran"
        changeHandle={mockFunc}
      />
    )
    const inputEl = getByTestId("input")
    expect(inputEl).toHaveValue("msg")
    expect(inputEl).toBeDisabled()
  })

  it("recoding false, loading false, check change event", () => {
    const { getByTestId } = render(
      <ChatBoxInput
        recoding={false}
        loading={false}
        message="msg"
        transcript="tran"
        changeHandle={mockFunc}
      />
    )
    const inputEl = getByTestId("input")
    expect(inputEl).toHaveValue("msg")
    expect(inputEl).toBeEnabled()

    // change eventの発火確認
    fireEvent.change(inputEl, { target: { value: "msg change" } })
    expect(window.alert).toHaveBeenCalledWith("msg change")
  })
})
