import { ChatGptMock } from "./ChatGptMock"
import { IChatGpt } from "./IChatGpt"

export class ChatGpt implements IChatGpt {
  private SCHEMA = "http://"
  private DOMAIN = "localhost:8000"

  public url() {
    return this.DOMAIN + this.SCHEMA
  }

  /**
   * @param msg
   * @returns
   */
  public async conversation(msg: string) {
    return await fetch(`${this.url()}/agents/conversation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: msg,
      }),
    })
  }

  public static makeInstance(): IChatGpt {
    return new this()
  }

  public static makeMock(): IChatGpt {
    return new ChatGptMock()
  }
}
