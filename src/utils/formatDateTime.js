import moment from 'moment';

export const convertUTCToLocalDate = (dateToConvert, defaultFormat = 'YYYY-MM-DD HH:mm:ss') => moment(moment(dateToConvert, defaultFormat).toDate()).local();
export const convertDateTime = (dateToConvert, defaultFormat = 'YYYY-MM-DD HH:mm:ss') => moment(dateToConvert).format(defaultFormat);
