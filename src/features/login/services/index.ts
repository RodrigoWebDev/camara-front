import apiClient from '@/services/apiClient';

export interface LoginDTO {
  login: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    role: string;
    name: string;
  };
}

export async function loginUser(credentials: LoginDTO): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>(
    '/auth/login',
    credentials
  );

  // salva no localStorage para o interceptor capturar
  localStorage.setItem('token', data.access_token);
  localStorage.setItem('name', data.user.name);
  localStorage.setItem('id', data.user.id.toString());
  localStorage.setItem('roleName', data.user.role.toLowerCase());
  return data;
}
