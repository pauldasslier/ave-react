import React from 'react';

const {
  Provider: CalendarServiceProvider,
  Consumer: CalendarServiceConsumer
} = React.createContext();

export {
  CalendarServiceProvider,
  CalendarServiceConsumer
};