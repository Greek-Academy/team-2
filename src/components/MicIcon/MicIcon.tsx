import { FC } from "react"
import "./MicIcon.scss"
import micSvg from "../../assets/mic.svg"

interface IMicIconProps {
  visible: boolean
}

export const MicIcon: FC<IMicIconProps> = ({ visible }) => {
  return (
    <div
      className="backdrop"
      data-testid="backdrop"
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <img src={micSvg} className="icon" />
    </div>
  )
}