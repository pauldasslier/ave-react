import React from 'react';

const UpdateTime = ({ updateTime }) => {
  let month = new Date(updateTime).getMonth();
  let day = new Date(updateTime).getDate();
  month = (month <= 9) ? `0${month + 1}`: month +1;
  day = (day <= 9) ? `0${day}`: day;
  const date = `${day}.${month}`;

  return (
    <div>Последнее обновление: {date}</div>
  );
};

export default UpdateTime;