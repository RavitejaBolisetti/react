/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const disableFutureDate = (value) => {
    return value > new Date();
};

export const disablePastDate = (value) => {
    console.log(value, ' value ',  value < new Date(),  ' date ', new Date());
    return value < new Date();
};
