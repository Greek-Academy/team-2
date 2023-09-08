export interface IChatGpt {
  conversation(msg: string): Promise<Response>
}
