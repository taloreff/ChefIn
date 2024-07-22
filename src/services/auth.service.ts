import { httpService } from './http.service';
import { store } from '../store/store';
import { SET_USER } from "../store/reducers/user.reducer";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: any;
}

export const authService = {
  async register(email: string, password: string, confirmPassword: string, username: string): Promise<AuthResponse> {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const data = { email, password, username };
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

  async googleLogin(credential: string): Promise<AuthResponse> {
    const response: AuthResponse = await httpService.post('auth/google', { credential });
    localStorage.setItem('loggedinUser', JSON.stringify(response.user));
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    store.dispatch({ type: SET_USER, user: response.user });
    return response;
  },

  async logout(): Promise<void> {
    localStorage.clear();
    store.dispatch({ type: SET_USER, user: null });
    try {
      await httpService.get('auth/logout');
    } catch (err) {
      console.log('Logout request failed:', err);
    }
  },

  async refresh(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }
    const response: AuthResponse = await httpService.post('auth/refresh', { refreshToken });
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  },
};
