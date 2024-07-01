import React, { useState } from 'react';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderCalendar = (date: Date): JSX.Element[] => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: JSX.Element[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="empty-cell"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div key={day} className="day-cell">
          {day}
        </div>,
      );
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>Prev</button>
        <h2 id="monthYear">
          {currentDate.toLocaleString('default', { month: 'long' })}{' '}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={nextMonth}>Next</button>
      </div>
      <div className="calendar-body">
        <div className="day-names">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="days">{renderCalendar(currentDate)}</div>
      </div>
    </div>
  );
};

export default Calendar;
