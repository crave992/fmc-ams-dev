// models/TimeLog.ts
export interface TimeLog {
  date: string;
  userId: string;
  userName: string;
  timeIn: string | null;
  lunchIn: string | null;
  lunchOut: string | null;
  timeOut: string | null;
}
