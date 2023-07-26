// components/EmployeeRecord.tsx
import React, { useEffect, useState } from 'react';
import { TimeLog } from '@/models/TimeLog';
import Button from '@mui/material/Button';
import DigitalClock from './DigitalClock';
import { useTimeLog } from '@/hook/useTimeLog';

interface EmployeeRecordProps {
  // Define any additional props you might need
}

const EmployeeRecord: React.FC<EmployeeRecordProps> = () => {
  const { timeLog, updateTimeLogForCurrentUser } = useTimeLog();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [canRecordTimeIn, setCanRecordTimeIn] = useState<boolean>(true);
  const [canRecordLunchIn, setCanRecordLunchIn] = useState<boolean>(false);
  const [canRecordLunchOut, setCanRecordLunchOut] = useState<boolean>(false);
  const [canRecordTimeOut, setCanRecordTimeOut] = useState<boolean>(false);

  useEffect(() => {
    // Update the current time every second for the digital clock
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    // Disable all buttons if Time In is recorded
    if (timeLog?.timeIn !== null) {
      setCanRecordTimeIn(false);
      setCanRecordLunchOut(false);
    } else {
      // Enable Time In button and disable others
      setCanRecordTimeIn(true);
      setCanRecordLunchOut(false);
    }

    // Enable Lunch In button if Time In is recorded but Lunch In is not
    if (timeLog?.timeIn !== null && timeLog?.lunchIn === null) {
      setCanRecordLunchIn(true);
    } else {
      setCanRecordLunchIn(false);
    }

    // Enable Lunch Out button if Lunch In is recorded but Lunch Out is not
    if (timeLog?.lunchIn !== null && timeLog?.lunchOut === null) {
      setCanRecordLunchOut(true);
    } else {
      setCanRecordLunchOut(false);
    }

    // Enable Time Out button if Lunch Out is recorded but Time Out is not
    if (timeLog?.lunchOut !== null && timeLog?.timeOut === null) {
      setCanRecordTimeOut(true);
    } else {
      setCanRecordTimeOut(false);
    }

    if (timeLog?.timeOut !== null) {
      const currentTime = new Date();
      const lastAllowedTime = new Date(currentTime);
      lastAllowedTime.setHours(23, 59, 0, 0);
      if (currentTime < lastAllowedTime) {
        setCanRecordTimeIn(false);
        setCanRecordLunchIn(false);
        setCanRecordLunchOut(false);
        setCanRecordTimeOut(false);
      }
    }

    // Enable all buttons if it's a new day and the time is 00:00
    const currentTime = new Date();
    const nextDay = new Date(currentTime);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    if (currentTime >= nextDay) {
      setCanRecordTimeIn(true);
      setCanRecordLunchIn(false);
      setCanRecordLunchOut(false);
      setCanRecordTimeOut(false);
    }

    return () => clearInterval(timer);
  }, [timeLog]);

  const formatTimestamp = (timestamp: string | null) => {
    if (!timestamp) return 'Not recorded';

    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const computeTimeBetweenLunchInAndLunchOut = (timeLog: TimeLog) => {
    if (timeLog.lunchIn && timeLog.lunchOut) {
      const lunchInTime = new Date(timeLog.lunchIn).getTime();
      const lunchOutTime = new Date(timeLog.lunchOut).getTime();
      const timeDiffMs = lunchOutTime - lunchInTime;
      const minutes = Math.floor(timeDiffMs / 60000);
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hours and ${remainingMinutes} minutes`;
    }
    return 'N/A';
  };

  const computeTotalTime = (timeLog: TimeLog): number | null => {
    if (timeLog?.timeIn && timeLog?.timeOut) {
      const timeInMs = new Date(timeLog.timeIn).getTime();
      const timeOutMs = new Date(timeLog.timeOut).getTime();
      const timeDiffMs = timeOutMs - timeInMs;
      const totalTimeMinutes = Math.floor(timeDiffMs / 60000);
      return totalTimeMinutes;
    }
    return null;
  };

  const handleEvent = async (event: 'Time In' | 'Lunch In' | 'Lunch Out' | 'Time Out') => {
    try {
      const timestamp = new Date().toISOString();
      const updatedTimeLog: TimeLog = {
        ...timeLog!,
        date: timeLog?.date || '',
        [event === 'Time In' ? 'timeIn' : event === 'Lunch In' ? 'lunchIn' : event === 'Lunch Out' ? 'lunchOut' : 'timeOut']: timestamp,
      };

      // Compute and update the totalTime when recording Time Out
      if (event === 'Time Out') {
        const totalTime = computeTotalTime(updatedTimeLog);
        updatedTimeLog.totalTime = totalTime;
      }

      // Update the user's time log for the current date in Firestore
      if (timeLog?.date) {
        await updateTimeLogForCurrentUser(timeLog.date, updatedTimeLog);
      }
    } catch (error) {
      console.error(`Error recording ${event}:`, error);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Display the digital clock */}
      <DigitalClock currentTime={currentTime} />
      <div className="flex flex-row gap-4 justify-center w-full">
        <Button
          variant="contained"
          onClick={() => handleEvent('Time In')}
          color="primary"
          disabled={!canRecordTimeIn}
        >
          Time In
        </Button>
        <Button
          variant="contained"
          onClick={() => handleEvent('Lunch In')}
          color="primary"
          disabled={!canRecordLunchIn}
        >
          Lunch In
        </Button>
        <Button
          variant="contained"
          onClick={() => handleEvent('Lunch Out')}
          color="primary"
          disabled={!canRecordLunchOut}
        >
          Lunch Out
        </Button>
        <Button
          variant="contained"
          onClick={() => handleEvent('Time Out')}
          color="primary"
          disabled={!canRecordTimeOut}
        >
          Time Out
        </Button>
      </div>
      

      {/* Display the recorded time log */}
      {timeLog && (
        <div className="text-center">
          <h2 className="mb-2">Recorded Time Log for {timeLog.date}:</h2>
          <p>Time In: {formatTimestamp(timeLog.timeIn)}</p>
          <p>Lunch In: {formatTimestamp(timeLog.lunchIn)}</p>
          <p>Lunch Out: {formatTimestamp(timeLog.lunchOut)}</p>
          <p>Time Out: {formatTimestamp(timeLog.timeOut)}</p>
          {timeLog.lunchIn && timeLog.lunchOut && (
            <p className="mt-2">Computed Time: {computeTimeBetweenLunchInAndLunchOut(timeLog)}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeRecord;
