import { call, put, throttle, all, fork, take, cancelled, cancel } from 'redux-saga/effects';
import { Chat } from '@/types';
import Api from '../axios/Api';
import { eventChannel } from 'redux-saga';

export function* rootSaga() {
  yield all([
    helloSaga(),
    watchGetUser(),
    watchSendMessage(),
  ])
}

function* helloSaga() {
  console.log('Hello Sagas!')
}
const setAppLoading = () => {
  return { type: 'SET_APP_LOADING' }
};

const setAppNotLoading = () => {
  return { type: 'SET_APP_NOT_LOADING' }
};

export const showPopupLogin = () => {
  return { type: 'SHOW_POPUP_LOGIN' }
};

export const hidePopupLogin = () => {
  return { type: 'HIDE_POPUP_LOGIN' }
};

export const setUser = (data: any) => {
  return { type: 'SET_USER', user: data }
}

export const getUser = () => {
  return { type: 'GET_USER' }
};

export function* watchGetUser(): any {
  yield throttle(1000, 'GET_USER', getUserAsync)
};

function* getUserAsync(): any {
  try {
    const response: any = yield call(Api.get, '/users', { headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') } });
    const data = response?.data?.data?.user;
    const user = {
      id: data.user_id ?? 1,
      name: data.username ?? null,
      avatar: data.avatar ?? null,
      generations: data.generations ?? 0,
      chats: data.chats ?? null,
      isLogin: true
    }
    yield put(setUser(user));
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setAppNotLoading());
  }
};

export const addMessage = (data: any) => {
  return { type: 'ADD_MESSAGE', message: data }
}

export const sendMessage = (text: string, properties: any, chatId: number | null = null) => {
  return { type: 'SEND_MESSAGE', text, properties, chatId };
};

export function* watchSendMessage(): any {
  yield throttle(1000, 'SEND_MESSAGE', sendMessageAsync)
};

function* sendMessageAsync(action: any): any {
  try {
    const { text, properties, chatId } = action;
    const response: any = yield call(Api.post, '/chats/async', {
      text, properties, chatId
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
    const { key, chats, answerId } = response?.data?.data;

    const newChatId = response?.data?.data?.chatId;
    yield put(setChats(chats));
    yield put(setChatId(newChatId));
    yield put(setTypingMessageId(answerId));
    yield put(setTypingMessageIndex(0));

    const sseTask = yield fork(watchSSE, newChatId, answerId, key);
    /*const sse = new EventSource(`https://test-seopt.lampymarket.com/api/chats/${newChatId}/stream?answer_id=${answerId}&key=${key}`);
    sse.addEventListener("message", ({ data }) => {
      let msgObj = JSON.parse(data)
      console.log(msgObj.text);
      yield put(setTypingMessageText());
    });*/
  } catch (err) {
    console.log(err);
  }
};
function createEventSourceChannel(newChatId, answerId, key) {
  return eventChannel((emit) => {
    const sse = new EventSource(`https://test-seopt.lampymarket.com/api/chats/${newChatId}/stream?answer_id=${answerId}&key=${key}`);
    sse.addEventListener("message", (event) => {
      const msgObj = JSON.parse(event.data);
      emit(msgObj.text);
    });

    // Функция для закрытия EventSource
    const unsubscribe = () => {
      sse.close();
    };

    // Очистка и отписка от событий при завершении саги
    const unsubscribeOnCancel = () => {
      unsubscribe();
    };

    return unsubscribeOnCancel;
  });
}

function* watchSSE(newChatId, answerId, key) {
  const channel = yield call(createEventSourceChannel, newChatId, answerId, key);
  let buffer :string =''
  try {
    while (true) {
      const text = yield take(channel);
      buffer+=text
      yield put(setTypingMessageText(buffer));
      console.log(buffer)
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

export const setChatId = (chatId: number | null) => {
  return { type: 'SET_CHAT_ID', payload: chatId }
}
export const setChats = (chats: Chat[]) => {
  return { type: 'SET_CHATS', payload: chats }
}
export const setTypingMessageId = (id: number | null) => {
  return { type: 'SET_TYPING_MESSAGE_ID', payload: id }
}
export const setTypingMessageText = (text: string) => {
  return { type: 'SET_TYPING_MESSAGE_TEXT', payload: text }
}
export const setTypingMessageIndex = (index: number) => {
  return { type: 'SET_TYPING_MESSAGE_INDEX', payload: index }
}