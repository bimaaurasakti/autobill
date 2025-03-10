/* eslint-disable @typescript-eslint/no-explicit-any */
// types.ts
export interface ScheduledMessage {
  id: number;
  recipient: string;
  template_name: string;
  scheduled_time: string;
  sent: boolean;
  created_at: string;
}

export interface ScheduleRequest {
  recipient: string;
  template_name: string;
  scheduled_time: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}
