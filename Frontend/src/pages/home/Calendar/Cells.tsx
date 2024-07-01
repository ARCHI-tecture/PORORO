// import React, { useState } from 'react';
// import dayjs from 'dayjs';
// import './Calendar.css';

// const Calendar: React.FC = () => {
//   const [selectedDay, setSelectedDay] = useState<string>(
//     dayjs().format('MM/DD/YY'),
//   );

//   const handleSelectDate = (v: string) => {
//     setSelectedDay(v);
//   };

//   const renderCalendarBoard = (
//     selectedDay: string,
//     handleSelectDate: (v: string) => void,
//   ) => {
//     const startOfMonth = dayjs(selectedDay).startOf('month');
//     const endOfMonth = dayjs(selectedDay).endOf('month');
//     const daysInMonth = endOfMonth.date();
//     const firstDayIndex = startOfMonth.day();

//     const calendar: JSX.Element[] = [];

//     for (let i = 0; i < firstDayIndex; i++) {
//       calendar.push(<div key={`empty-${i}`} className="empty-cell"></div>);
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = startOfMonth.date(day).format('MM/DD/YY');
//       calendar.push(
//         <div
//           key={day}
//           className={`day-cell ${date === selectedDay ? 'selected' : ''}`}
//           onClick={() => handleSelectDate(date)}
//         >
//           {day}
//         </div>,
//       );
//     }

//     return calendar;
//   };

//   const board = renderCalendarBoard(selectedDay, handleSelectDate);

//   return (
//     <div className="calendar-wrapper">
//       <div className="calendar-header">
//         <button
//           onClick={() =>
//             setSelectedDay(
//               dayjs(selectedDay).subtract(1, 'month').format('MM/DD/YY'),
//             )
//           }
//         >
//           Prev
//         </button>
//         <h2>{dayjs(selectedDay).format('MMMM YYYY')}</h2>
//         <button
//           onClick={() =>
//             setSelectedDay(
//               dayjs(selectedDay).add(1, 'month').format('MM/DD/YY'),
//             )
//           }
//         >
//           Next
//         </button>
//       </div>
//       <div className="calendar-board">
//         <div className="day-names">
//           <div>Sun</div>
//           <div>Mon</div>
//           <div>Tue</div>
//           <div>Wed</div>
//           <div>Thu</div>
//           <div>Fri</div>
//           <div>Sat</div>
//         </div>
//         <div className="days">{board}</div>
//       </div>
//     </div>
//   );
// };

// export default Calendar;
