/*
 *   Copyright (c) 2024 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const handleEnterValidation = (e, codeKey = 'Enter') => {
    e?.code === codeKey && e?.preventDefault();
};