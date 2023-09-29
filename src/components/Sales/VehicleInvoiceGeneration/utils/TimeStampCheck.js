/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import dayjs from 'dayjs';

export const timeStampCheck = (time1, time2) => {
    let hours = dayjs(time1).diff(dayjs(time2), 'hours');
    const days = Math.floor(hours / 24);
    hours = hours - days * 24;
    //console.log('🚀 ~ file: TimeStampCheck.js:13 ~ timeStampCheck ~ hours:', hours);
    if (hours < 24) return true;
};
