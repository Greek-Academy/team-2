import { FC } from "react"
import "./Spinner.scss"

interface ISpinnerProps {
  visible: boolean
}

export const Spinner: FC<ISpinnerProps> = ({ visible }) => {
  return (
    <section
      className="backdrop"
      data-testid="backdrop"
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <div className="loader loader-6">
        <div className="loader-inner"></div>
      </div>
    </section>
  )
}
