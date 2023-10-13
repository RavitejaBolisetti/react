/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export function GetAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    if (typeof dateString === 'undefined') {
        return undefined;
    }
    let age = today?.getFullYear() - birthDate?.getFullYear();
    let m = today?.getMonth() - birthDate?.getMonth();
    if (m < 0 || (m === 0 && today?.getDate() < birthDate?.getDate())) {
        age--;
    }
    return age;
}
