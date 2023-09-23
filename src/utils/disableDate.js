/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import moment from 'moment';

export const disableFutureDate = (value) => {
    return value > new Date();
};

export const disableFieldsOnFutureDate = (value) => {
    return value < new Date();
};

export const disablePastDate = (value) => {
    return value.isBefore(moment().subtract(1, 'day'));
};
