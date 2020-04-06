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