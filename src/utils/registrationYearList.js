/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

const registrationYears = () => {
    const currentYear = new Date().getFullYear();
    const yearsList = [];
    for (let i = currentYear; i >= currentYear - 15; i--) {
        yearsList.push({ key: i, value: i });
    }
    return yearsList;
};

export const registrationYearList = registrationYears();
