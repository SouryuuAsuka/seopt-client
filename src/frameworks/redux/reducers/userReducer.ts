import { Chat } from "@/types";

export interface UserState {
  id: number | null,
  name: string | null,
  avatar: number;
  isLogin: boolean | null;
  generations: number;
  chats: Chat[] | null;
}
const initialState: UserState = {
  id: null,
  name: null,
  avatar: 1,
  isLogin: false,
  generations: 0,
  chats: null
};
export const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.user,
      };
      case 'SET_CHATS':
        return {
          ...state,
          chats: action.payload,
        };
    default:
      return state;
  }
};