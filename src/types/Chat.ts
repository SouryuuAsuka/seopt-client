import { Msg } from "./Msg";

export type Chat = {
  chat_id: number | null;
  title: string;
  messages: Msg[]
}