import dayjs from 'dayjs';
import 'dayjs/locale/ja';

dayjs.locale('ja');

const days = '日月火水木金土';

export const getWeekDays = () => {
  const now = dayjs();
  const baseSunday = now.add(-now.day(), 'days');
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const date = baseSunday.add(i, 'days');
    const day = days.charAt(i);
    weekDays.push(date.format('MM/DD') + ' (' + day + ')');
  }
  return weekDays;
};

export const getBaseSunday = (date) => {
  const now = date || dayjs();
  return now.add(-now.day(), 'days');
};

export const getBaseSundays = () => {
  const baseSundays = [];
  const baseSunday = getBaseSunday();
  baseSundays.push(baseSunday);
  baseSundays.push(baseSunday.add(-7, 'days'));
  return baseSundays;
};

export const getYYYYMMDD = (date) => {
  return date.format('YYYYMMDD');
};

export const getMMDDDay = (date) => {
  return date.format(`MM/DD (${days.charAt(date.day())})`);
};

export const getTerm = (sunday) => {
  const monday = sunday.add(1, 'days');
  const saturday = sunday.add(6, 'days');
  const mondayFormat = monday.format(`DD (${days.charAt(monday.day())})`);
  const saturdayFormat = saturday.format(`DD (${days.charAt(saturday.day())})`);
  return `${mondayFormat} - ${saturdayFormat}`;
};

export const getCurrentTimeIndex = () => {
  const now = dayjs();
  let diff = 3;
  if (now.hour() >= 6 && now.hour() < 12) {
    diff = 2;
  } else if (now.hour() >= 12 && now.hour() <= 23) {
    diff = 1;
  }
  return now.day() * 2 - diff;
};
