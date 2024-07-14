import { AnyAction } from 'redux';
import { userService } from '../../services/user.service';

export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const SET_USERS = 'SET_USERS';

export interface UserState {
  user: any;
  users: any[];
}

const initialState: UserState = {
  user: userService.getLoggedinUser(),
  users: [],
};

export function userReducer(state = initialState, action: AnyAction): UserState {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.userId)
      };
    case SET_USERS:
      return { ...state, users: action.users };
    default:
      return state;
  }
}
