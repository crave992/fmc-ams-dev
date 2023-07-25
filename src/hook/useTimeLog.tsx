// hooks/useTimeLog.ts
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth'; // Assuming you have a custom hook to get the current user ID and name
import { TimeLog } from '@/models/TimeLog';
import useFirebase from './useFirebase';

export function useTimeLog() {
  const firebase = useFirebase()!;
  const { userId, userName } = useAuth(); // Assuming you have a custom hook to get the current user ID and name
  const [currentDate, setCurrentDate] = useState<string>('');
  const [timeLog, setTimeLog] = useState<TimeLog | null>(null);

  useEffect(() => {
    // Get the current date when the component mounts
    const formattedDate = new Date().toISOString().split('T')[0];
    setCurrentDate(formattedDate);
  }, []);

  // Fetch or create the user's time log for the current date
  const fetchOrCreateUserTimeLog = async (userId: string, userName: string, currentDate: string): Promise<TimeLog | null> => {
    try {
      const employeeRecordRef = firebase.firestore().collection('employeeRecord').doc(userId);
      const documentSnapshot = await employeeRecordRef.get();
  
      if (documentSnapshot.exists) {
        const data = documentSnapshot.data();
        const timeLogs = data?.timeLogs || [];
        const existingTimeLog = timeLogs.find((log: TimeLog) => log.date === currentDate);
  
        if (existingTimeLog) {
          setTimeLog(existingTimeLog); // Set the fetched timeLog in state
          return existingTimeLog;
        } else {
          const newTimeLog: TimeLog = {
            date: currentDate,
            userId,
            userName,
            timeIn: null,
            lunchIn: null,
            lunchOut: null,
            timeOut: null,
          };
          await employeeRecordRef.update({ timeLogs: [...timeLogs, newTimeLog] });
          setTimeLog(newTimeLog); // Set the new timeLog in state
          return newTimeLog;
        }
      } else {
        const newTimeLog: TimeLog = {
          date: currentDate,
          userId,
          userName,
          timeIn: null,
          lunchIn: null,
          lunchOut: null,
          timeOut: null,
        };
        await employeeRecordRef.set({ timeLogs: [newTimeLog] });
        setTimeLog(newTimeLog); // Set the new timeLog in state
        return newTimeLog;
      }
    } catch (error) {
      console.error('Error fetching or creating user time log:', error);
      return null;
    }
  };

  // Update the user's time log for the current date in the "employeeRecord" collection
  const updateTimeLogForCurrentUser = async (currentDate: string, updatedTimeLog: TimeLog) => {
    try {
      const employeeRecordRef = firebase.firestore().collection('employeeRecord').doc(userId);
      const documentSnapshot = await employeeRecordRef.get();

      if (documentSnapshot.exists) {
        const data = documentSnapshot.data();
        const timeLogs = data?.timeLogs || [];
        const updatedTimeLogs = timeLogs.map((log: TimeLog) => (log.date === currentDate ? updatedTimeLog : log));
        await employeeRecordRef.update({ timeLogs: updatedTimeLogs });
        setTimeLog(updatedTimeLog);
      }
    } catch (error) {
      console.error('Error updating user time log:', error);
    }
  };

  // Fetch or create the user's time log and set it in the state
  useEffect(() => {
    const fetchTimeLog = async () => {
      if (firebase && userId && currentDate) {
        const userTimeLog = await fetchOrCreateUserTimeLog(userId, userName, currentDate); // Add userName here
        if (userTimeLog !== null) {
          setTimeLog(userTimeLog);
        }
      }
    };
    fetchTimeLog();
  }, [firebase, userId, userName, currentDate]);

  return { timeLog, updateTimeLogForCurrentUser };
}
