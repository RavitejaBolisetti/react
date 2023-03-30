import moment from 'moment';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const convertUTCToLocalDate = (dateToConvert, defaultFormat = 'YYYY-MM-DD HH:mm:ss') => moment(moment(dateToConvert, defaultFormat).toDate()).local();
export const convertCalenderDate = (dateToConvert = moment(), defaultFormat = 'YYYY-MM-DD') => {
    return dayjs(dateToConvert, defaultFormat);
};
export const convertDate = (dateToConvert = moment(), defaultFormat = 'YYYY-MM-DD') => moment(dateToConvert).format(defaultFormat);
export const convertDateTime = (dateToConvert = moment(), defaultFormat = 'YYYY-MM-DD HH:mm:ss') => moment(dateToConvert).format(defaultFormat);
