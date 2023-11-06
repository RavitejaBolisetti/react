/*
*   Copyright (c) 2023 Mahindra & Mahindra Ltd.
*   All rights reserved.
*   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
*/
import { translateContent } from "./translateContent";

export const preparePlaceholderText = (name, prefix = true) => {
    return prefix ? translateContent('global.placeholder.input').concat(' ' + name?.toLowerCase()) : name;
};

export const preparePlaceholderSelect = (name) => {
    return translateContent('global.placeholder.select') + name?.toLowerCase();
};

export const preparePlaceholderAutoComplete = (name) => {
    return 'Select' + name?.toLowerCase();
};

export const prepareDatePickerText = (name, prefix = true) => {
    return name;
};

export const preparePlaceholderSearch = (name='') => {
    return 'Search' + name?.toLowerCase();
};
