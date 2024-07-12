import { userService } from "../../services/user.service"

export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'

export interface UserState {
    user: any;
    users: any[];
}

const initialState: UserState = {
    user: userService.getLoggedinUser(),
    users: [],
}

export function userReducer(state = initialState, action: any): UserState {
    var newState = state
    switch (action.type) {
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        default:
    }
    return newState
}
