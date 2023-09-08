import { useSubmitter } from "./useSubmitter"

const mockFunc = (v: string): void => {
  console.log(v)
}

const { handleKeyDown } = useSubmitter(mockFunc)

describe("handleKeyDown", () => {
  it("push space key", () => {
    const e = new KeyboardEvent("keydown", { key: "Space" })
    const actual = handleKeyDown(e, "message")
    expect(actual).toBeFalsy()
  })

  it("push enter key, unpush command or ctrl", () => {
    const e = new KeyboardEvent("keydown", {
      key: "Enter",
      metaKey: false,
      ctrlKey: false,
    })
    const actual = handleKeyDown(e, "message")
    expect(actual).toBeFalsy()
  })

  it("push enter key and command", () => {
    const e = new KeyboardEvent("keydown", {
      key: "Enter",
      metaKey: true,
      ctrlKey: false,
    })
    const actual = handleKeyDown(e, "message")
    expect(actual).toBeTruthy()
  })

  it("push enter key and ctrl", () => {
    const e = new KeyboardEvent("keydown", {
      key: "Enter",
      metaKey: false,
      ctrlKey: true,
    })
    const actual = handleKeyDown(e, "message")
    expect(actual).toBeTruthy()
  })
})
