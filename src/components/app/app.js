import React from 'react';
import DateRange from '../date-range';
import { CalendarServiceProvider } from '../calendar-service-context';
import CalendarService from '../../services';
import ErrorBoundry from '../error-boundry';

const App = () => {

  const calendarService = new CalendarService();
  return (
    <ErrorBoundry>
      <CalendarServiceProvider value={calendarService}>
        <DateRange />
      </CalendarServiceProvider>
    </ErrorBoundry>
  );
};
export default App;