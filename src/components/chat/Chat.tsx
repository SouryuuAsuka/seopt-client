import { useAppDispatch, useAppSelector } from "@/hooks"
import hamburgerIcon from '@/assets/images/icons/hamburger.svg'
import { Chat as ChatType, Msg } from "@/types";
import Message from "./message/Message";
import { setChatId, setChats } from "@/frameworks/redux/sagas";
import { useState } from "react";
import ChatItem from "./item/Item";

export default function Chat() {
  const [hide, setHide] = useState(false);
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.user.chats);
  const chatId = useAppSelector((state) => state.app.chatId);
  let activeMessages: Msg[] | null = null;
  if (chatId) {
    activeMessages = chats.filter((chat) => {
      if (chat.chat_id === chatId) {
        return true;
      }
    })[0]?.messages ?? null;
  }

  const changeHideState = () => {
    if (hide) {
      setHide(false)
    } else {
      setHide(true)
    }
  }
  
  const addChat = () =>{
    const searchChat = chats.filter((ch)=>{
      if(ch.chat_id === null) return true;
      return false;
    })
    if(searchChat.length == 0){
      const newChat:ChatType = {
        chat_id: null,
        title: 'Пустой чат',
        messages:[]
      }
      dispatch(setChats([...chats, newChat]));
    }
  }
  return (
    <div className="chat">
      {chats && Array.isArray(chats) && chats.length > 0
        ? <>
          <div className={"chat__panel_wrapper " + (hide ? 'hide' : '')} onClick={() => { setHide(true) }}>
            <div className={"chat__panel " + (hide ? 'hide' : '')} onClick={e => e.stopPropagation()}>
              <div className="chat__panel_nav">
                <img src={hamburgerIcon} onClick={changeHideState} />
              </div>
              <div className="chat__panel_create">
                <button onClick={addChat}>+ Создать чат</button>
              </div>
              {
                chats && chats.map(chat => (
                  <ChatItem key={chat.chat_id} title={chat.title} id={chat.chat_id} />

                ))
              }
            </div>
          </div>
          <div className="chat__body">
            {
              activeMessages && activeMessages.map(message => (
                <Message message={message} key={message.message_id} />
              ))
            }
          </div>
        </>
        : <div className="chat__empty">
          Нет активных чатов
        </div>
      }

    </div>
  )
}