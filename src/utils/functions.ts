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

/**
 * Function for GUID
 *
 * @see https://learnersbucket.com/examples/javascript/unique-id-generator-in-javascript/
 * @returns GUID
 */
export const generateID = () => {
  let gen = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  return `${gen()}${gen()}-${gen()}${gen()}-${gen()}${gen()}`;
};

/**
 * Function that formats seconds to HH:MM:SS
 *
 * @param {number} s raw seconds
 * @returns {string} formatted date (HH:MM:SS)
 */
export const getFormattedTimer = (s: number) => {
  const seconds = parseInt(s % 60);
  const minutes = parseInt((s / 60) % 60);
  const hours = parseInt((s / 3600) % 60);

  return `${hours < 10 ? '0' + hours : hours}:${
    minutes < 10 ? '0' + minutes : minutes
  }:${seconds < 10 ? '0' + seconds : seconds}`;
};

/**
 * Get seconds from passed Date parameter
 *
 */
export const getSecondsFrom = (date: number) => {
  const now = Date.now();

  return (now - date) / 1000;
};
