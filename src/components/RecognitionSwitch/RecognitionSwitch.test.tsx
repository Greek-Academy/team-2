import { render } from "@testing-library/react"
import { RecognitionSwitch } from "./RecognitionSwitch"
import "@testing-library/jest-dom/extend-expect"

describe("RecognitionSwitch", () => {
  it("status OFF", () => {
    const { getByText } = render(
      <RecognitionSwitch
        listening={false}
        disabled={false}
        recognitionHandle={() => {}}
      />
    )
    expect(getByText("OFF")).toBeInTheDocument()
  })

  it("status ON", () => {
    const { getByText } = render(
      <RecognitionSwitch
        listening={true}
        disabled={false}
        recognitionHandle={() => {}}
      />
    )
    expect(getByText("ON")).toBeInTheDocument()
  })
})
