/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import dayjs from 'dayjs';
import { GetAge } from './getAge';

export const validateRequiredInputField = (fieldName, lowercase = true) => ({
    required: true,
    message: 'Please enter ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validateRequiredInputFieldMinLength = (fieldName, lowercase = true) => ({
    required: true,
    min: 3,
    message: 'Please enter atleast 3 character to search ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validateRequiredSelectField = (fieldName, lowercase = true) => ({
    required: true,
    message: 'Please select ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validateEmailField = (fieldName, lowercase = true) => ({
    type: 'email',
    message: 'Please enter valid ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validateRequiredEmailField = (fieldName, lowercase = true) => ({
    required: true,
    type: 'email',
    message: 'Please enter valid ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validationFieldLetterAndNumber = (fieldName, lowercase = true) => ({
    pattern: /^[A-Za-z0-9]*$/,
    message: 'Please use only letters and numbers in ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validationFieldLetter = (fieldName, lowercase = true) => ({
    pattern: /^[A-Za-z]*$/,
    message: 'Please use only letters in ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validatePanField = (fieldName, lowercase = true) => ({
    pattern: /^([A-Z]){5}(\d){4}([A-Z]){1}?$/,
    message: 'Please enter valid ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validateVehicleRegistrationField = (fieldName, lowercase = true) => ({
    pattern: /^[0-9]{2}BH[0-9]{4}[A-HJ-NP-Z]{2}$/,
    message: 'Please enter valid ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validateMobileNoField = (fieldName, lowercase = true) => ({
    pattern: /^([5-9]){1}([0-9]){9}$/,
    message: 'Please enter valid ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validateFieldsPassword = (fieldName, lowercase = true) => ({
    message: fieldName + ' should contain at least 1 lowercase, 1 uppercase, 1 numeric, 1 special character and should be of minimum 8 characters in length',
    pattern: '^(?!.* )(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}',
});

export const validateAlphanumericWithSpaceHyphenPeriod = (fieldName, lowercase = true) => ({
    message: fieldName + ' can contain only alphanumeric characters',
    pattern: /^[\w\-.\s]+$/,
});

export const validateAlphanumericWithSpace = (fieldName, lowercase = true) => ({
    message: fieldName + ' can contain only alphanumeric characters with space',
    pattern: /^[a-zA-Z0-9 ]*$/,
});

export const validateLettersWithWhitespaces = (fieldName, lowercase = true) => ({
    message: fieldName + ' can contain only letters with whitespaces',
    pattern: /^[a-zA-Z ]*$/,
});

export const validationFieldLetteNumberandPeriod = (fieldName, lowercase = true) => ({
    pattern: /^[a-zA-Z0-9.]*$/,
    message: 'Please use only letters, numbers and period in' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validationNumber = (fieldName, lowercase = true) => ({
    pattern: /^\d+$/,
    message: 'Please enter valid ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validateOnlyPositiveNumber = (fieldName, lowercase = true) => ({
    pattern: /^[1-9]+[0-9]*$/,
    message: 'Please enter valid ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validateGSTIN = (fieldName, lowercase = true) => ({
    pattern: /^\d{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    message: 'Please enter valid ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validateNumberWithTwoDecimalPlaces = (fieldName, lowercase = true) => ({
    pattern: /^\d+(\.\d{1,2})?$/,
    message: 'Please enter valid ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validatePincodeField = (fieldName, digit = '6', lowercase = true) => ({
    pattern: /^\d{6}(?:\s*,\s*\d{6})*$/,
    message: 'Please enter 6 digit valid ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validatInstagramProfileUrl = (fieldName) => ({
    pattern: /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/gim,
    message: 'Please enter valid url ' + fieldName,
});

export const validatFacebookProfileUrl = (fieldName) => ({
    pattern: /(?:http:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w-]*\/)*([\w-]*)/,
    message: 'Please enter valid url ' + fieldName,
});

export const validatYoutubeProfileUrl = (fieldName) => ({
    pattern: /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/,
    message: 'Please enter valid url ' + fieldName,
});

export const validattwitterProfileUrl = (fieldName) => ({
    pattern: /^https?:\/\/(www\.)?twitter\.com\/(#!\/)?([^/]+)(\/\w+)*$/,
    message: 'Please enter valid url ' + fieldName,
});

export const duplicateValidator = (value, fieldName, dataList, updateVal) => {
    let dataListToCheck = dataList?.length ? [...dataList] : [];
    if (updateVal && dataList?.length > 0) {
        let index = dataList?.findIndex((el) => el[fieldName].toLowerCase() === updateVal.toLowerCase());
        if (index !== -1) {
            dataListToCheck?.splice(index, 1);
        }
    }

    if (dataListToCheck?.findIndex((el) => el[fieldName]?.toLowerCase() === value?.toLowerCase()) !== -1) {
        return Promise.reject('Duplicate found');
    } else {
        return Promise.resolve('');
    }
};

export const valueBetween0to100 = (fieldName) => ({
    pattern: /^(100|\d{1,2})$/,
    message: 'Please enter ' + fieldName + ' between 0 to 100',
});

export const NumberValidation = (fieldName) => ({
    pattern: /^[a-zA-Z0-9]*$/,
    message: 'Please enter valid ' + fieldName,
});

export const duplicateProductValidator = (value, dataList) => {
    if (dataList?.length > 0) {
        for (let i = 0; i < dataList?.length; i++) {
            if (dataList[i]?.code === value?.attributeName?.label) {
                return Promise.reject('Duplicate found');
            }
        }
        return Promise.resolve('');
    } else {
        return Promise.resolve('');
    }
};

export const searchValidator = (_, value) => {
    if (!value || (value && value.trim().length >= 3)) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('Please enter atleast 3 character to search'));
};

export const searchValidatorPincode = (_, value) => {
    const pattern = /^\d{6}$/;
    if (!value || pattern.test(value)) {
        return Promise.resolve();
    } else {
        return Promise.reject(new Error('Please enter 6 digit numeric value to search'));
    }
};

export const validateTan = (fieldName) => ({
    pattern: /^[A-Z]{4}\d{5}[A-Z]{1}$/,
    message: 'Please enter valid ' + fieldName,
});
export const validateTin = (fieldName) => ({
    pattern: /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}/,
    message: 'Please enter valid ' + fieldName,
});
export const validateDrivingLicenseNo = (fieldName) => ({
    pattern: /^([A-Z]{2})(\d{2}|\d{3})[a-zA-Z]{0,1}(\d{4})(\d{7})$/,
    message: 'Please enter valid ' + fieldName,
});
export const validateDrivingLicenseNoWithSpace = (fieldName) => ({
    pattern: /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/,
    message: 'Please enter valid ' + fieldName + ' (HR-0XX0XX000XXX7)',
});
export const validateAadhar = (fieldName) => ({
    pattern: /^\d{4}\d{4}\d{4}$/,
    message: 'Please enter valid ' + fieldName,
});
export const validateVoterId = (fieldName) => ({
    pattern: /^([a-zA-Z]){3}\d{7}$/,
    mesage: 'Please enter valid ' + fieldName,
});

export const valueOfPer = (fieldName) => ({
    pattern: /^(100(\.00?)?|[1-9]?\d(\.\d\d?)?)$/,
    message: 'Please enter ' + fieldName + ' between 0 to 100',
});

export const ageGreator18 = (value) => {
    let dateString = dayjs(value).format('YYYY-MM-DD');
    let calAge = GetAge(dateString);

    if (calAge < 16) {
        return Promise.reject('your age should be 16 or greater');
    } else {
        return Promise.resolve('');
    }
};
export const noWhiteSpaceinBeginning = (fieldName) => ({
    pattern: /^[^\s]+(\s+[^\s]+)*$/,
    message: 'Please dont enter spaces ',
});

export const compareAmountValidator = (amount1, amount2, fieldName) => {
    if (parseFloat(amount1) < parseFloat(amount2)) {
        return Promise.reject(fieldName + ' should not be greater than ' + amount1);
    } else {
        return Promise.resolve('');
    }
};
export const validateNegativeNumber = (fieldName) => ({
    pattern: /^\d+$/,
    message: fieldName + ' Does not accept negative numbers',
});

export const isIssuePriceValid = (value, dealerPrice) => {
    if (!value) return Promise.resolve();
    else if (!dealerPrice) return Promise.reject(new Error(`Net Dealer Price not present`));
    else if (value > dealerPrice) return Promise.reject(`Issue charge can't be greater than dealer price`);
    else return Promise.resolve();
};

export const isValidQunatity = (value, balancedQuantity) => {
    if (!value) return Promise.resolve();
    else if (!balancedQuantity || balancedQuantity === null) return Promise.reject(new Error(`Balance quantity is not present`));
    else if (value > balancedQuantity) return Promise.reject(`It can't be greater than balance quantity`);
    else return Promise.resolve();
};

export const campareDate = (value, compareTo, title) => {
    const bool = dayjs(value).format('YYYY-MM-DD') >= dayjs(compareTo).format('YYYY-MM-DD');
    if (bool) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('Date cant be less than from date'));
};

export const compareFromToDate = (compareTo) => {
    return {
        validator: (_, value) => {
            return campareDate(value, compareTo);
        },
    };
};
