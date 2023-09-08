import { IChatGpt } from "./IChatGpt"

export class ChatGptMock implements IChatGpt {
  public async conversation(_msg: string) {
    return new Response()
  }
}
