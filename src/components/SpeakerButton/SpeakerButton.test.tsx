import { render, screen, fireEvent } from '@testing-library/react'
import { useSpeaker } from "../../hooks/useSpeaker"
import { SpeakerButton } from './SpeakerButton'
import '@testing-library/jest-dom/extend-expect'

jest.mock("../../hooks/useSpeaker")

const mockUseSpeaker = useSpeaker as jest.MockedFunction<typeof useSpeaker>
describe('SpeakerButton', () => {
  it('SpeakerButton render Test', () => {
    const handlePlayMock = jest.fn()
    mockUseSpeaker.mockReturnValueOnce({
      state: true,
      handlePlay: handlePlayMock,
    })
    
    render(<SpeakerButton stringToRead='abcde'/>)
    const speakerButton = screen.getByRole("button")
    expect(speakerButton).toBeEnabled()
  });
});

test("Test when stringToRead is correctly entered and status is true.(handlePlay Calling)", () => {
    const handlePlayMock = jest.fn()
    mockUseSpeaker.mockReturnValueOnce({
      state: true,
      handlePlay: handlePlayMock,
    })
  
    render(<SpeakerButton stringToRead="うなぎ二千円を３人で割り勘して下さい" />)
    const speakerButton = screen.getByRole("button")
    fireEvent.click(speakerButton)
  
    expect(handlePlayMock).toHaveBeenCalledWith("うなぎ二千円を３人で割り勘して下さい")
})

test("Test when status is TRUE and stringToRead is blank.(Disabled)", () => {
  const handlePlayMock = jest.fn()
  mockUseSpeaker.mockReturnValueOnce({
    state: true,
    handlePlay: handlePlayMock,
  })

  render(<SpeakerButton stringToRead="" />)
  const speakerButton = screen.getByRole("button")
  
  expect(speakerButton).toBeDisabled()
})

test("Test when status is FALSE and stringToRead contains a string.(Disabled)", () => {
  const handlePlayMock = jest.fn()
  mockUseSpeaker.mockReturnValueOnce({
    state: false,
    handlePlay: handlePlayMock,
  })

  render(<SpeakerButton stringToRead="あいうえお" />)
  const speakerButton = screen.getByRole("button")
  
  expect(speakerButton).toBeDisabled()
})

test("Test when status is FALSE and stringToRead contains a string.(Button Label)", () => {
  const handlePlayMock = jest.fn()
  mockUseSpeaker.mockReturnValueOnce({
    state: false,
    handlePlay: handlePlayMock,
  })

  render(<SpeakerButton stringToRead="あいうえお" />)
  const speakerButton = screen.getByRole("button")
  
  expect(speakerButton).toHaveTextContent("音声出力非対応")
})

test("Test when status is TRUE and stringToRead is blank.(Button Label)", () => {
  const handlePlayMock = jest.fn()
  mockUseSpeaker.mockReturnValueOnce({
    state: true,
    handlePlay: handlePlayMock,
  })

  render(<SpeakerButton stringToRead="" />)
  const speakerButton = screen.getByRole("button")
  
  expect(speakerButton).toHaveTextContent("音声出力非対応")
})

test("Test when stringToRead is correctly entered and status is true.(Button Label)", () => {
  const handlePlayMock = jest.fn()
  mockUseSpeaker.mockReturnValueOnce({
    state: true,
    handlePlay: handlePlayMock,
  })

  render(<SpeakerButton stringToRead="ビール3000円を２人で割り勘して下さい" />)
  const speakerButton = screen.getByRole("button")
  fireEvent.click(speakerButton)

  expect(speakerButton).toHaveTextContent("音声読上げ")
})
