import React, { Component } from 'react';
import { withCalendarServiceContext } from '../hoc';
import RenderView from '../render-view';
import DateInput from '../date-input';
import UpdateTime from '../update-time';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

class DateRange extends Component {

  state = {
    date: null,
    updateTime: null,
    periods: [],
    loading: true,
    error: false
  };

  componentDidMount() {
    this.getCurrentDate();
  };

  getCurrentDate() {
    const { calendarService } = this.props;
    calendarService.getDate()
      .then(this.onDataLoaded)
      .catch(this.onError)
  };

  onDataLoaded = ({fullDate, time}) => {
    const items = this.createItems(this.createPeriod(time));
    this.setState({
      date: fullDate,
      updateTime: time,
      periods: items,
      loading: false
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  onChange = (prop) => {
    const { calendarService } = this.props;
    calendarService.getDate()
    .then(({time}) => {
      this.setState((prevState) => {
        if (prevState.time !== time) {
          const items = this.createItems(this.createPeriod(prop));
          return {
            updateTime: time,
            periods: items,
            date: prop
          };
        };
      });
    });
  };

  createPeriod = (ms) => {
    const date = new Date(ms);
    const start = +date;
    const year = date.getFullYear() + 1;
    const month = date.getMonth();
    const day = date.getDate();
    const end = new Date(year, month, day);
    return {
      start: start,
      end: +end
    };
  };

  createItems = (period) => {
    let dates = [];
    for (let i = period.start; i < period.end; i += 3600000 * 168) {
      dates.push(i);
    };
    let periods = [];
    for (let i = 0; i < dates.length; i++) {
      let date = new Date(dates[i]);

      switch(date.getDay()) {
        case 1:
          periods[i] = `${(new Date(date)).toLocaleDateString()} -
                        ${(new Date(date.setHours(144))).toLocaleDateString()}`;
          break;
        case 2:
          periods[i] = `${(new Date(date.setHours(-24))).toLocaleDateString()} -
                        ${(new Date(date.setHours(144))).toLocaleDateString()}`;
          break;
        case 3:
          periods[i] = `${(new Date(date.setHours(-48))).toLocaleDateString()} -
                        ${(new Date(date.setHours(144))).toLocaleDateString()}`;
          break;
        case 4:
          periods[i] = `${(new Date(date.setHours(-72))).toLocaleDateString()} -
                        ${(new Date(date.setHours(144))).toLocaleDateString()}`;
          break;
        case 5:
          periods[i] = `${(new Date(date.setHours(-96))).toLocaleDateString()} -
                        ${(new Date(date.setHours(144))).toLocaleDateString()}`;
          break;
        case 6:
          periods[i] = `${(new Date(date.setHours(-120))).toLocaleDateString()} -
                        ${(new Date(date.setHours(144))).toLocaleDateString()}`;
          break;
        case 0:
          periods[i] = `${(new Date(date.setHours(-144))).toLocaleDateString()} -
                        ${(new Date(date.setHours(144))).toLocaleDateString()}`;
          break;
        default:
          return periods[i];
      };
    };
    return periods;
  };

  render() {
    const { loading, date, updateTime, periods, error } = this.state;

    if (loading) {
      return <Spinner />
    };
    if (error) {
      return <ErrorIndicator />
    }

    return (
      <div>
        <DateInput onChange={this.onChange} value={date} />
        <UpdateTime updateTime={updateTime} />
        <RenderView period={periods}/>
      </div>
    );
  };
};

export default withCalendarServiceContext()(DateRange);