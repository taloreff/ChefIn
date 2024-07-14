import { httpService } from './http.service';
import { store } from '../store/store';
import { SET_USER } from "../store/reducers/user.reducer";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: any;
}

export const authService = {
  async register(email: string, password: string, confirmPassword: string): Promise<AuthResponse> {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const data = { email, password };
    const response: AuthResponse = await httpService.post('auth/register', data);
    localStorage.setItem('loggedinUser', JSON.stringify(response.user));
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    store.dispatch({ type: SET_USER, user: response.user });
    return response;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const data = { email, password };
    const response: AuthResponse = await httpService.post('auth/login', data);
    localStorage.setItem('loggedinUser', JSON.stringify(response.user));
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    store.dispatch({ type: SET_USER, user: response.user });
    return response;
  },

  async logout(): Promise<void> {
    localStorage.removeItem('loggedinUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    store.dispatch({ type: SET_USER, user: null });
    await httpService.get('auth/logout');
  },

  async refresh(): Promise<AuthResponse> {
    const response: AuthResponse = await httpService.get('auth/refresh');
    localStorage.setItem('accessToken', response.accessToken);
    return response;
  }
};
