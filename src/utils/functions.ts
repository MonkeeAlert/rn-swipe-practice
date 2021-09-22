import {days, months} from './constants';

interface IParsedDate {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  monthLiteral: string;
  dayLiteral: string;
}

/**
 * Function for capitalizing string
 *
 * @param {string} s string to capitalze
 * @returns {string}
 */
export const capitalize = (s: string) => {
  if (s.length === 0) {
    return '';
  } else if (s.length === 1) {
    return s.toUpperCase();
  } else {
    return `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
  }
};

/**
 * Function for getting date info
 *
 * @param {number | undefined} timestamp
 * @returns object with date
 */
export const getDate = (timestamp?: number) => {
  const date = parseDate(timestamp ?? Date.now()) as IParsedDate;

  return {
    date,
    toString: () => getFormattedDate(date),
  };
};

const parseDate = (date: number): IParsedDate | object => {
  if (!date) {
    return {};
  } else {
    const _date = new Date(date);

    return {
      year: _date.getFullYear(),
      month: _date.getMonth() + 1,
      day: _date.getDate(),
      monthLiteral: months[_date.getMonth()],
      dayLiteral: days[_date.getDay()],
      hours: _date.getHours(),
      minutes: _date.getMinutes(),
      seconds: _date.getSeconds(),
    };
  }
};

const getFormattedDate = (o: IParsedDate) => {
  const now = new Date(Date.now());
  const time = `${o.hours < 10 ? '0' + o.hours : o.hours}:${
    o.minutes < 10 ? '0' + o.minutes : o.minutes
  }`;

  const date = `on ${o.monthLiteral} ${o.day}${
    o.year === now.getFullYear() ? '' : ', ' + o.year
  }`;

  return `${time}, ${date}`;
};
