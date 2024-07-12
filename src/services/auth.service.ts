import { httpService } from './http.service';
import { store } from '../store/store';
import { SET_USER } from "../store/reducers/user.reducer";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: any; 
}

export const authService = {
  async register(email: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const data = { email, password };
    const response: AuthResponse = await httpService.post('auth/register', data);
    sessionStorage.setItem('loggedinUser', JSON.stringify(response.user));
    store.dispatch({ type: SET_USER, user: response.user }); 
    return response;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const data = { email, password };
    const response: AuthResponse = await httpService.post('auth/login', data);
    sessionStorage.setItem('loggedinUser', JSON.stringify(response.user));
    store.dispatch({ type: SET_USER, user: response.user }); 
    return response;
  },

  async refresh(): Promise<AuthResponse> {
    return await httpService.get('auth/refresh');
  },

  async logout() {
    sessionStorage.removeItem('loggedinUser');
    store.dispatch({ type: SET_USER, user: null }); 
    return await httpService.get('auth/logout');
  }
};
