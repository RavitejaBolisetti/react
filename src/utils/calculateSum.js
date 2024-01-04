/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const CalculateSum = (data, key = 'key') => {
    if (Array.isArray(data) && key) {
        return data.reduce((prev, curr) => prev + Number(curr?.[key]), 0);
    }
    return 0;
};
