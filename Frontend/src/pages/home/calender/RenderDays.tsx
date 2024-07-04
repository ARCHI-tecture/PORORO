import React from 'react';

const RenderDays: React.FC = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <div className="days row">
      {days.map((day, index) => (
        <div className="col" key={index}>
          {day}
        </div>
      ))}
    </div>
  );
};

export default RenderDays;
