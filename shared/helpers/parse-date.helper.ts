import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/es';

dayjs.extend(localeData);
dayjs.locale('es');

const formatDateDescription = (dateString: string): string => {
  const date = dayjs(dateString, 'MM-DD-YYYY');
  return date.format('D [de] MMMM [de] YYYY');
};

export default formatDateDescription;
