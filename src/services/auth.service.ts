// src/services/auth.service.ts

import { httpService } from './http.service.ts';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async register(email: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const data = { email, password };
    return await httpService.post('auth/register', data);
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const data = { email, password };
    return await httpService.post('auth/login', data);
  },

  async refresh(): Promise<AuthResponse> {
    return await httpService.get('auth/refresh');
  },

  async logout() {
    return await httpService.get('auth/logout');
  }
};
