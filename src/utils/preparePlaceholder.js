/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const preparePlaceholderText = (name, prefix = true, prefixText = 'Enter') => {
    return prefix ? prefixText.concat(' ' + name?.toLowerCase()) : name;
};

export const preparePlaceholderSelect = (name) => {
    return 'Select ' + name?.toLowerCase();
};

export const preparePlaceholderAutoComplete = (name) => {
    return 'Select' + name?.toLowerCase();
};

export const prepareDatePickerText = (name, prefix = true) => {
    return name;
};
