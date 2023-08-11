/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { convertDateMonthYearDayjs } from 'utils/formatDateTime';
export const FORMTYPE_CONSTANTS = {
    DATE: {
        id: 'Date',
        name: 'Date',
    },
    NUMBER: {
        id: 'Number',
        name: 'Number',
    },
    BOOLEAN: {
        id: 'Boolean',
        name: 'Boolean',
    },
    INPUT: {
        id: 'Input',
        name: 'Input',
    },
};
export const MakeCheckResult = (props) => {
    const { type, data } = props;
    let checkResult = '';
    switch (type) {
        case FORMTYPE_CONSTANTS?.DATE?.id: {
            checkResult = checkResult.concat(convertDateMonthYearDayjs(data?.fromDate));
            checkResult = checkResult.concat('-');
            checkResult = checkResult.concat(convertDateMonthYearDayjs(data?.toDate));
            return checkResult;
        }

        case FORMTYPE_CONSTANTS?.BOOLEAN?.id: {
            if (data?.boolean) return 'Yes';
            return 'No';
        }
        case FORMTYPE_CONSTANTS?.NUMBER?.id: {
            checkResult = checkResult.concat(data?.fromNumber);
            checkResult = checkResult.concat('-');
            checkResult = checkResult.concat(data?.toNumber);
            return checkResult;
        }
        case FORMTYPE_CONSTANTS?.INPUT?.id: {
            return data?.text;
        }
    }
};
