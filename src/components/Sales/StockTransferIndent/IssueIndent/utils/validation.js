/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

export const isIssuePriceValid = (value, dealerPrice) => {
    if (!value) return Promise.resolve();
    else if (!dealerPrice) return Promise.reject(new Error(`Net Dealer Price not present`));
    else if (value > dealerPrice) return Promise.reject(`Issue charge can't be greater than dealer price`);
    else return Promise.resolve();
};
