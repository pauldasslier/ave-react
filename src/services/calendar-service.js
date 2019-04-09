
export default class CalendarService {
  _apiBase = 'http://adasslier.beget.tech';

  getResourse = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
 
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, recieved ${res.status}`);
    };

    return await res.json();
  };

  getDate = async () => {
    const apiData = await this.getResourse(`/yandex-api.php`);
    return this._transformData(apiData);
  };

  _transformData({ time }) {
    return {
      time: time,
      fullDate: this.formatDate(time),
      updateTime: this.forUpdateTime(time)
    };
  };

  formatDate(props) {
    let fullYear = new Date(props).getFullYear();
    let month = this.correctMonth(props);
    let day = this.correctDay(props);
    let date = `${fullYear}-${month}-${day}`;
    return date;
  };

  forUpdateTime(props) {
    let month = this.correctMonth(props);
    let day = this.correctDay(props);
    let date = `${day}.${month}`;
    return date;
  };

  correctMonth(props) {
    let month = new Date(props).getMonth();
    month = (month <= 9) ? `0${month + 1}`: month +1;
    return month;
  };
  
  correctDay(props) {
    let day = new Date(props).getDate();
    day = (day <= 9) ? `0${day}`: day;
    return day;
  };
};

