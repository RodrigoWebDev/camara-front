import apiClient from '@/services/apiClient';

export type GenderEnum = 'male' | 'female' | 'other' | 'notAnswer';

export interface RegisterDTO {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
  photo?: string;
  document?: string;
  documentFile?: string;
  birth_date?: string;
  gender?: GenderEnum;
  cep?: string;
  address?: string;
  city?: string;
  state?: string;
  number?: string;
}

export interface UserResponse {
  user_id: number;
  full_name: string;
  email: string;
  phone?: string | null;
  password_hash: string;
  status: string;
  created_at: string;
  updated_at: string;
  role_id: string;
  document: string;
  birth_date: string;
  gender: string;
}

export async function registerUser(data: RegisterDTO): Promise<UserResponse> {
  try {
    const { data: response } = await apiClient.post<UserResponse>(
      '/users',
      data
    );
    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || 'Erro no cadastro'
    );
  }
}
