import { useAppDispatch, useAppSelector } from "@/hooks";
import { Msg } from "@/types";
import seoptAvatar from "@/assets/images/seopt_avatar.png";
import { useEffect, useState } from "react";
import { setTypingMessageId, setTypingMessageIndex } from "@/frameworks/redux/sagas";

type Props = {
  message: Msg;
}
export default function Message({ message }: Props) {
  const user = useAppSelector((state) => state.user);
  const typingMessage = useAppSelector((state) => state.app.typingMessage);
  const [currentText, setCurrentText] = useState('');
  const dispatch = useAppDispatch();
  let title: string;
  let avatar: string;
  useEffect(() => {
    console.log(typingMessage.index + " - "+typingMessage.text.length);
    if (typingMessage.id === message.message_id) {
      if (typingMessage.index < typingMessage.text.length) {
        const timeout = setTimeout(() => {
          setCurrentText(typingMessage.text.slice(0, typingMessage.index+1));
          dispatch(setTypingMessageIndex(typingMessage.index+1))
        }, 30);
        return () => clearTimeout(timeout);
      } else if (typingMessage.index == typingMessage.text.length){
        setCurrentText(typingMessage.text);
      }
    }
  }, [typingMessage.index, typingMessage]);

  if (message.type === 'question') {
    title = user.name;
    avatar = '/avatars/128/128_' + user.avatar + '.png';
  } else if (message.type === 'answer') {
    title = 'Seoptimus';
    avatar = seoptAvatar;
  }
  console.log('typingMessage - ' + JSON.stringify(typingMessage))

  return (
    <div className={"message " + message.type} >
      <div className="message__avatar">
        <img src={avatar} />
      </div>
      <div className="message__body">
        <div className="message__title">
          {title}
        </div>
        <div className="message__text">
          {(message.message_id === typingMessage.id)
            ? currentText
            : message.text
          }
        </div>
        <div className="message__footer">
          {new Date(message.created).toLocaleString("en-GB")}
        </div>
      </div>
    </div>
  )
}