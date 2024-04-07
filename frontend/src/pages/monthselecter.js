import React from 'react';

const MonthSelector = ({ selectedMonth, onChange }) => {
  // Function to handle going to the previous month
  const prevMonth = () => {
    onChange(selectedMonth - 1);
  };

  // Function to handle going to the next month
  const nextMonth = () => {
    onChange(selectedMonth + 1);
  };

  const currentDate = new Date();

  return (
    <div>
      <button onClick={prevMonth}>{'<'}</button>
      <span>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
      <button onClick={nextMonth}>{'>'}</button>
    </div>
  );
};

export default MonthSelector;
