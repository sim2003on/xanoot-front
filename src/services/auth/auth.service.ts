import { axiosClassic } from '@/api/api.interceptors';

import { API_URL } from '@/config/api.config';

import { IAuthForm, IAuthResponse } from '@/shared/types/auth.interface';

import { removeFromStorage, saveTokenToStorage } from './auth-token.service';

class AuthService {
  public async main(type: 'login' | 'register', data: IAuthForm) {
    const response = await axiosClassic<IAuthResponse>({
      url: API_URL.auth(`${type}`),
      method: 'POST',
      data
    });

    const accessToken = response.data.accessToken;

    if (accessToken) saveTokenToStorage(accessToken);

    return response;
  }

  public async getNewTokens() {
    const response = await axiosClassic<IAuthResponse>({
      url: API_URL.auth('login/access-token'),
      method: 'POST'
    });

    const accessToken = response.data.accessToken;

    if (accessToken) saveTokenToStorage(accessToken);

    return response;
  }

  public async logout() {
    const response = await axiosClassic<boolean>({
      url: API_URL.auth('logout'),
      method: 'POST'
    });

    if (response.data) removeFromStorage();

    return response;
  }
}

export const authService = new AuthService();
