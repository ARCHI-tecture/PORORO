import React from 'react';
import { format } from 'date-fns';

interface HeaderProps {
  currentMonth: Date;
}

const Header: React.FC<HeaderProps> = ({ currentMonth }) => {
  return (
    <div className="header row">
      {currentMonth.toLocaleString('en-US', { month: 'long' })}
    </div>
  );
};

export default Header;
