import { authService } from "../../services/auth.service";
import { store } from '../store';

import { LOADING_DONE, LOADING_START } from "../reducers/system.reducer";
import { REMOVE_USER, SET_USER, SET_USERS } from "../reducers/user.reducer";
import { userService } from "../../services/user.service";

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

export async function login(credentials: { email: string; password: string }) {
    try {
        const response = await authService.login(credentials.email, credentials.password)
        store.dispatch({
            type: SET_USER,
            user: response.user
        })
        console.log('Welcome back ' + response.user.fullname + "!")
        return response.user
    } catch (err: any) {
        console.log('Cannot log in: ' + err.message)
        throw err
    }
}

export async function signup(credentials: { email: string; password: string; confirmPassword: string }) {
    try {
        const response = await authService.register(credentials.email, credentials.password, credentials.confirmPassword)
        store.dispatch({
            type: SET_USER,
            user: response.user
        })
        console.log('Welcome ' + response.user.fullname + "!")
        return response.user
    } catch (err) {
        console.log('Cannot signup')
        throw err
    }
}

export async function logout() {
    try {
        await authService.logout()
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
        localStorage.setItem('loggedinUser', JSON.stringify(updatedUser))
        console.log('User updated')
        return updatedUser
    } catch (err) {
        console.log('Cannot update user')
        throw err
    }
}
