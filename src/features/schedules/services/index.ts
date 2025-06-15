/* eslint-disable @typescript-eslint/no-explicit-any */

import { PaginationType } from '@/common/utils/types';
import apiClient from '@/services/apiClient';

export type ScheduleStatus = 'confirmed' | 'pending' | 'completed' | 'canceled';

export type Schedule = {
  id: string;
  date: string;
  name: string;
  location: string;
  description: string;
  status: ScheduleStatus;
  userName: string;
  userId: number;
  attendantName: string;
  attendantId: number;
  serviceId?: string;
  reminderWpp?: boolean;
  reminderEmail?: boolean;
  observations?: string;
  protocol: number;
};

export type StatusCount = {
  pending: number;
  confirmed: number;
  completed: number;
  canceled: number;
};

export const getSchedules = async (
  userId: number,
  page?: number,
  limit?: number,
  status?: ScheduleStatus
): Promise<PaginationType<Schedule>> => {
  try {
    const response = await apiClient.get<PaginationType<Schedule>>(
      '/schedule',
      {
        params: { userId, page, limit, status },
      }
    );
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || 'Erro ao retornar agendamentos';
    throw new Error(message);
  }
};

export const getStatusCount = async (userId: number): Promise<StatusCount> => {
  try {
    const response = await apiClient.get<StatusCount>('/schedule/statusCount', {
      params: { userId },
    });
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || 'Erro ao retornar contagem de status';
    throw new Error(message);
  }
};
