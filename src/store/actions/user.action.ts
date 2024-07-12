import { userService } from "../../services/user.service";
import { store } from '../store';

import { LOADING_DONE, LOADING_START } from "../reducers/system.reducer";
import { REMOVE_USER, SET_USER, SET_USERS } from "../reducers/user.reducer";

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId: string) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials: any) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        throw err
    }
}

export async function signup(credentials: any) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function updateUser(user: any) {
    try {
        const updatedUser = await userService.update(user)
        store.dispatch({
            type: SET_USER,
            user: updatedUser
        })
        return updatedUser
    } catch (err) {
        throw err
    }
}
