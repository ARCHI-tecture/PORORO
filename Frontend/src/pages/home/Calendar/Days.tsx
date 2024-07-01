import React from 'react';

const Days: React.FC = () => {
  const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="days row">
      {date.map((day, index) => (
        <div className="col" key={index}>
          {day}
        </div>
      ))}
    </div>
  );
};

export default Days;
