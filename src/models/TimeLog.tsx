export interface TimeLog {
  date: string;
  userId: string;
  userName: string;
  timeIn: string | null;
  lunchIn: string | null;
  lunchOut: string | null;
  timeOut: string | null;
  totalTime: number | null; // Changed the type to number
}