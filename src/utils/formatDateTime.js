/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import moment from 'moment';
import dayjs from 'dayjs';

export const dateFormat = 'DD/MM/YYYY';

export const formattedCalendarDate = (dateToConvert = '', dateFormat = 'YYYY-MM-DD') => {
    return dateToConvert ? dayjs(moment(dateToConvert).format(dateFormat), dateFormat) : null;
};

export const convertCalenderDate = (dateToConvert = '', defaultFormat = 'DD/MM/YYYY', currentDate = false) => {
    return dateToConvert || currentDate ? dayjs(moment(dateToConvert || moment()).format('YYYY/MM/DD'), defaultFormat) : null;
};
export const convertDate = (dateToConvert = moment(), defaultFormat = 'YYYY-MM-DD') => moment(dateToConvert).format(defaultFormat);
export const convertDateTime = (dateToConvert = '', defaultFormat = 'YYYY-MM-DD HH:mm:ss') => (dateToConvert ? moment(dateToConvert).format(defaultFormat) : 'NA');
export const convertDateAndTime = (dateToConvert = '', defaultFormat = 'DD MMM YYYY  h:MM A') => (dateToConvert ? moment(dateToConvert).format(defaultFormat) : 'NA');

export const convertDateMonthYear = (dateToConvert = moment(), defaultFormat = 'DD MMM YYYY') => moment(dateToConvert).format(defaultFormat);

export const convertDateMonthYearDayjs = (dateToConvert = dayjs(), defaultFormat = 'DD MMM YYYY') => dayjs(dateToConvert).format(defaultFormat);

export const convertDateToCalender = (dateToConvert) => (dateToConvert ? dayjs(dateToConvert, dateFormat) : null);

export const covertCalenderDateToDate = (dateToConvert = moment(), defaultFormat = 'DD-MM-YYYY') => {
    return dateToConvert ? dayjs(dateToConvert, defaultFormat) : null;
};

export const formatDate = (dateToFormat, converToFormat = 'YYYY-MM-DD') => (dateToFormat ? dateToFormat?.format(converToFormat) : null);
export const formatDateToCalenderDate = (dateToFormat, converToFormat = 'YYYY-MM-DD') => (dateToFormat ? dayjs(dateToFormat, converToFormat) : null);

export const formatTime = (dateToFormat, converToFormat = 'HH:mm') => (dateToFormat ? dayjs(dateToFormat, converToFormat) : null);
