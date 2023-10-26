import Chat from "@/components/chat/Chat";
import ChatForm from "@/components/chat/form/ChatForm"

export default function Index() {

  return (
    <div className='content'>
      <Chat />
      <ChatForm />
    </div>
  )
}