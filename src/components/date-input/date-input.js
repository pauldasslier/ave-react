import React from 'react';
import './date-input.css';

const DateInput = ({ onChange, value }) => {
  return (
    <div>
      <input type="date" value={value} onChange={({target}) => onChange(target.value)}/>
    </div>
  );
};

export default DateInput;