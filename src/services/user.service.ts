import { httpService } from './http.service'

const BASE_URL = "user/";

export const userService = {
    getUsers,
    getById,
    remove,
    update,
    login,
    signup,
    logout,
    getLoggedinUser,
}

function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId: string) {
    const user = await httpService.get(`${BASE_URL}${userId}`);
    return user;
}

function remove(userId: string) {
    return httpService.delete(`${BASE_URL}${userId}`)
}

async function update(user: any) {
    const updatedUser = await httpService.put(`${BASE_URL}${user._id}`, user)
    return updatedUser
}

async function login(credentials: { email: string; password: string }) {
    const user = await httpService.post(`auth/login`, credentials)
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

async function signup(credentials: { email: string; password: string; confirmPassword: string }) {
    const user = await httpService.post(`auth/signup`, credentials)
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

async function logout() {
    await httpService.post(`auth/logout`)
    sessionStorage.removeItem('loggedinUser')
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
}

function getDefaultUser(){
    return {
        username: '',
        email: '',
        password: '',
        profileImgUrl: '',
        tokens: [],
    }
}
