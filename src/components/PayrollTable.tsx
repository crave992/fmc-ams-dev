import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { format, startOfWeek, addDays, subMonths, addMonths } from 'date-fns'; // Import date-fns functions for date manipulation

interface PayrollData {
  date: string; // Format: "YYYY-MM-DD"
  hoursWorked: number;
}

// Sample data for the current month (Replace this with your actual data)
const samplePayrollData: PayrollData[] = [
  { date: "2023-07-01", hoursWorked: 8 },
  { date: "2023-07-02", hoursWorked: 7.5 },
  // ... and so on for each day in the current month
];

// ... (Previous code)

const PayrollTable: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get the total days in the current month
  const totalDaysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // Calculate the bimonthly period of the current month
  const firstHalfEndDay = 15;

  // Generate an array of days in the current month
  const daysArray = Array.from({ length: totalDaysInMonth }, (_, index) => index + 1);

  // Split daysArray into two separate arrays for first and second half
  const firstHalfDays = daysArray.slice(0, firstHalfEndDay);
  const secondHalfDays = daysArray.slice(firstHalfEndDay);

  // Function to get the total hours for each day
  const getHoursForDay = (day: number): number => {
    // Find the data for the given day
    const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day.toString().padStart(2, '0')}`;
    const payrollEntry = samplePayrollData.find((entry) => entry.date === date);

    return payrollEntry ? payrollEntry.hoursWorked : 0;
  };

  // Function to get the day name (Sunday, Monday, etc.) for a given date
  const getDayName = (date: Date): string => {
    return format(date, 'EEEE'); // 'EEEE' format gives the full day name
  };

  // Generate an array of day names for the first half
  const firstHalfStartOfWeek = startOfWeek(currentDate);
  const firstHalfDayNames = Array.from({ length: firstHalfDays.length }, (_, index) =>
    getDayName(addDays(firstHalfStartOfWeek, index))
  );

  // Generate an array of day names for the second half
  const secondHalfStartOfWeek = addDays(firstHalfStartOfWeek, firstHalfDays.length);
  const secondHalfDayNames = Array.from({ length: secondHalfDays.length }, (_, index) =>
    getDayName(addDays(secondHalfStartOfWeek, index))
  );

  // Function to navigate to the previous month
  const handlePreviousMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  // Function to navigate to the next month
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  // Function to compute the total hours in the first half
  const computeFirstHalfTotalHours = (): number => {
    return firstHalfDays.reduce((totalHours, day) => totalHours + getHoursForDay(day), 0);
  };

  // Function to compute the total hours in the second half
  const computeSecondHalfTotalHours = (): number => {
    return secondHalfDays.reduce((totalHours, day) => totalHours + getHoursForDay(day), 0);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center mb-4">
        <Button variant="outlined" color="primary" onClick={handlePreviousMonth}>
          Previous Month
        </Button>
        <h2 className="mx-4">{format(currentDate, 'MMMM yyyy')}</h2>
        <Button variant="outlined" color="primary" onClick={handleNextMonth}>
          Next Month
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              {firstHalfDayNames.map((dayName, index) => (
                <TableCell key={index}>{`${dayName} ${format(addDays(firstHalfStartOfWeek, index), 'M/d')}`}</TableCell>
              ))}
              <TableCell>Total Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">First Half</TableCell>
              {firstHalfDays.map((day) => (
                <TableCell key={day}>{getHoursForDay(day)}</TableCell>
              ))}
              <TableCell>{computeFirstHalfTotalHours()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} className="mt-8">
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              {secondHalfDayNames.map((dayName, index) => (
                <TableCell key={index}>{`${dayName} ${format(addDays(secondHalfStartOfWeek, index), 'M/d')}`}</TableCell>
              ))}
              <TableCell>Total Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">Second Half</TableCell>
              {secondHalfDays.map((day) => (
                <TableCell key={day}>{getHoursForDay(day)}</TableCell>
              ))}
              <TableCell>{computeSecondHalfTotalHours()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PayrollTable;
