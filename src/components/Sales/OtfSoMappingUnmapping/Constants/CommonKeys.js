/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
const formKeys = {
    otfDate: null,
    soNumber: null,
    soDate: null,
    soStatus: null,
    customerId: null,
    customerName: null,
    mobileNumber: null,
    chasisNumber: null,
    modelGroup: null,
    modelVariant: null,
    modelDescription: null,
};
export const setAllkeysToNull = (exception = undefined) => {
    if (!exception) return formKeys;
    let returnKeys = { ...formKeys };
    for (const k in formKeys) {
        if (exception?.includes(k)) {
            const { [k]: name, ...rest } = formKeys;
            returnKeys = rest;
        }
    }
    return returnKeys;
};
