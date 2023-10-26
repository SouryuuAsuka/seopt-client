import { sendMessage } from "@/frameworks/redux/sagas";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useState } from "react";

export default function ChatForm() {
  const [type, setType] = useState(0);
  const [limit, setLimit] = useState(4000);
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const chatId = useAppSelector((state) => state.app.chatId);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(sendMessage(text, {type, limit}, chatId))
    clearStates();
  }
  const clearStates = () => {
    setType(0);
    setLimit(4000);
    setText('');
  }
  return (
    <form onSubmit={handleSubmit} >
      <div className="chatForm__row">
        <div className="chatForm__group">
          <label htmlFor="type">Выберите тип запроса</label>
          <div className="select_wrapper">
            <select name="type" onChange={(event) => { setType(Number(event.target.value)) }} value={type}>
              <option value="0">Написать статью</option>
              <option value="1">Написать заголовок</option>
              <option value="2">Написать текст для карточки товара</option>
              <option value="3">Перевод текста на русский язык</option>
              <option value="4">Перевод текста на английский язык</option>
            </select>
          </div>
        </div>
        <div className="chatForm__group">
          <label htmlFor="limit">Выберите количество символов</label>
          <div className="select_wrapper">
            <select name="limit" onChange={(event) => { setLimit(Number(event.target.value)) }} value={limit}>
              <option value="4000">4000</option>
              <option value="3500">3500</option>
              <option value="3000">3000</option>
              <option value="2500">2500</option>
              <option value="2000">2000</option>
              <option value="1500">1500</option>
              <option value="500">500</option>
              <option value="250">250</option>
              <option value="150">150</option>
              <option value="75">75</option>
            </select>
          </div>
        </div>
      </div>
      <div className="chatForm__row">
        <div className="chatForm__group">
          <label htmlFor="message">Напишите ваш запрос</label>
          <textarea
            placeholder="Распишите подробно или кратко запрос для генерации текста"
            style={{ height: '204px' }}
            onChange={(event) => { setText(event.target.value) }}
            value={text} />
        </div>
      </div>
      <div className="chatForm__buttons">
        <button className='primary' type="submit">
          Сгенерировать текст
        </button>
        <button onClick={clearStates}>
          Сбросить
        </button>
      </div>
    </form>
  )
}