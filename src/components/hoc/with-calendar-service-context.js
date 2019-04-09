import React from 'react';
import { CalendarServiceConsumer } from '../calendar-service-context';

const withCalendarServiceContext = () => (Wrapped) => {
  return (props) => {
    return (
      <CalendarServiceConsumer>
        {
          (calendarService) => {
            return (
              <Wrapped {...props} calendarService={calendarService} />
            );
          }
        }
      </CalendarServiceConsumer>
    );
  };
};

export default withCalendarServiceContext;