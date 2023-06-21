/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const getMenyKey = (key) => key.toLowerCase();

export const getMenuValue = (dataSet, key, subKey = '') => {
    return subKey ? dataSet[getMenyKey(key)]?.[subKey] : dataSet[getMenyKey(key)];
};
