
type Popups = {
  login: boolean;
}

type TypingMessage = {
  id: number | null,
  text: string,
  index: number
}
export interface AppState {
  loading: boolean | null;
  popups: Popups;
  search: string;
  chatId: number | null;
  typingMessage: TypingMessage;
}

const initialState: AppState = {
  loading: true,
  search: '',
  popups: {
    login: false,
  },
  chatId: null,
  typingMessage: {
    id: null,
    text: '',
    index: 0
  },

};

export const appReducer = (state = initialState, action: any): AppState => {
  switch (action.type) {
    case 'SET_APP_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'SET_APP_NOT_LOADING':
      return {
        ...state,
        loading: false,
      };
    case 'SHOW_POPUP_LOGIN':
      return {
        ...state,
        popups: {
          ...state.popups,
          login: true
        }
      };
    case 'HIDE_POPUP_LOGIN':
      return {
        ...state,
        popups: {
          ...state.popups,
          login: false
        }
      };
    case 'SET_CHAT_ID':
      return {
        ...state,
        chatId: action.payload
      }
    case 'SET_TYPING_MESSAGE_ID':
      return {
        ...state,
        typingMessage: {
          ...state.typingMessage,
          id: action.payload
        }
      }
    case 'SET_TYPING_MESSAGE_TEXT':
      return {
        ...state,
        typingMessage: {
          ...state.typingMessage,
          text: action.payload
        }
      }
      case 'SET_TYPING_MESSAGE_INDEX':
        return {
          ...state,
          typingMessage: {
            ...state.typingMessage,
            index: action.payload
          }
        }
    default:
      return state;
  }
};