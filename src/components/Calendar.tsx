// components/Calendar.tsx

import React from 'react';

interface CalendarProps {
  year: number;
  month: number;
}

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const Calendar: React.FC<CalendarProps> = ({ year, month }) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const weeks: JSX.Element[] = [];
  let day = 1;

  for (let i = 0; i < 6; i++) {
    const days: JSX.Element[] = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfMonth) {
        days.push(<td key={`empty-${j}`} />);
      } else if (day <= daysInMonth) {
        days.push(<td key={day}>{day}</td>);
        day++;
      } else {
        days.push(<td key={`empty-${j}`} />);
      }
    }
    weeks.push(<tr key={i}>{days}</tr>);
    if (day > daysInMonth) break;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      <tbody>{weeks}</tbody>
    </table>
  );
};

export default Calendar;
