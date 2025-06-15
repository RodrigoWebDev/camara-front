import apiClient from '@/services/apiClient';

export interface EmailDTO {
  type: 'email' | 'cpf';
  value: string;
}

export interface UpdatePasswordDTO {
  password: string;
  token: string;
}

export async function sendEmail(data: EmailDTO): Promise<void> {
  try {
    await apiClient.put<void>('/auth/forgot-password', data);
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        'Erro ao tentar enviar e-mail.'
    );
  }
}

export async function updatePassword(data: UpdatePasswordDTO): Promise<void> {
  try {
    await apiClient.put<void>('/auth/reset-password', data);
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        'Erro ao tentar alterar senha.'
    );
  }
}
