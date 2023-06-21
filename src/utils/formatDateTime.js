import moment from 'moment';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const convertUTCToLocalDate = (dateToConvert, defaultFormat = 'YYYY-MM-DD HH:mm:ss') => moment(moment(dateToConvert, defaultFormat).toDate()).local();
export const convertCalenderDate = (dateToConvert = moment(), defaultFormat = 'DD-MM-YYYY') => {
    return dateToConvert ? dayjs(moment(dateToConvert).format('YYYY/MM/DD'), defaultFormat) : null;
};
export const convertDate = (dateToConvert = moment(), defaultFormat = 'YYYY-MM-DD') => moment(dateToConvert).format(defaultFormat);
export const convertDateTime = (dateToConvert = '', defaultFormat = 'YYYY-MM-DD HH:mm:ss') => (dateToConvert ? moment(dateToConvert).format(defaultFormat) : 'NA');

export const convertDateMonthYear = (dateToConvert = moment(), defaultFormat = 'DD MMM YYYY') => moment(dateToConvert).format(defaultFormat);