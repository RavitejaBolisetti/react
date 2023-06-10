export const validateRequiredInputField = (fieldName, lowercase = true) => ({
    required: true,
    message: 'Please enter ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validateRequiredSelectField = (fieldName, lowercase = true) => ({
    required: true,
    message: 'Please select ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validateEmailField = (fieldName, lowercase = true) => ({
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
    pattern: /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/,
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
    pattern: /^(0|[0-9][1-9]*)$/,
    message: 'Please enter valid ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validateOnlyPositiveNumber = (fieldName, lowercase = true) => ({
    pattern: /^[1-9]+[0-9]*$/,
    message: 'Please enter valid ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validateNumberOnly = (fieldName, lowercase = true) => ({
    pattern: /^\d+$/,
    message: 'Please enter valid ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validateGSTIN = (fieldName, lowercase = true) => ({
    pattern: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    message: 'Please enter valid ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validateNumberWithTwoDecimalPlaces = (fieldName, lowercase = true) => ({
    pattern: /^[0-9]*\.[0-9]{2}$/,
    message: 'Please enter valid ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validatePincodeField = (fieldName, digit = '6', lowercase = true) => ({
    pattern: /^\d{6}(?:\s*,\s*\d{6})*$/,
    message: 'Please enter 6 digit valid ' + (lowercase ? fieldName?.toLowerCase() : fieldName),
});

export const validatInstagramProfileUrl = (fieldName) =>({
    pattern: /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/igm,
    message: 'Please enter valid url ' + fieldName,
})

export const validatFacebookProfileUrl = (fieldName) =>({
    pattern: /(?:http:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/,
    message: 'Please enter valid url ' + fieldName,
})

export const validatYoutubeProfileUrl = (fieldName) =>({
    pattern: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/,
    message: 'Please enter valid url ' + fieldName,
})
// pattern: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/,
// pat1: /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/,

export const validattwitterProfileUrl = (fieldName) =>({
    pattern: /^https?:\/\/(www\.)?twitter\.com\/(#!\/)?([^/]+)(\/\w+)*$/,
    message: 'Please enter valid url ' + fieldName,
})
// pattern: /^http:\/\/)?(www\.)?twitter\.com\/(\w+)/,
// pattern: /(?:https?:)?\/\/(?:www\.|m\.)?twitter\.com\/(\w{2,15})\/?(?:\?\S+)?(?:\#\S+)?$/igm,

export const duplicateValidator = (value, fieldName, dataList, updateVal) => {
    let dataListToCheck = dataList || [];
    if (updateVal && dataList?.length > 1) {
        let index = dataList?.findIndex((el) => el[fieldName].toLowerCase() === updateVal);
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

export const valueBetween0to100 = (value, fieldName) => {
    if (value > 100 || value < 0) {
        return Promise.reject(fieldName + 'value should be greater than 0 and less than 100');
    } else {
        return Promise.resolve('');
    }
};

export const duplicateProductValidator = (value, dataList) => {
    let status = false;
    if (dataList?.length > 0) {
        for (let i = 0; i < dataList?.length; i++) {
            if (dataList[i]?.attributeName?.label === value?.attributeName?.label) {
                status = true;
                return Promise.reject('Duplicate found');
            }
            if (!status) {
                return Promise.resolve('');
            }
        }
    } else {
        return Promise.resolve('');
    }
    return Promise.resolve('');
};

export const searchValidator = (_, value) => {
    if (!value || (value && value.trim().length >= 3)) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('Please enter atleast 3 character to search'));
};

export const searchValidatorPincode = (_, value) => {
    const pattern = /^\d{6}(?:\s*,\s*\d{6})*$/;
    if (!value || pattern.test(value)) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('Please enter 6 digit numeric value to search'));
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
    pattern:  /^([A-Z]{2})(\d{2}|\d{3})[a-zA-Z]{0,1}(\d{4})(\d{7})$/,
    message: 'Please enter valid ' + fieldName,
    
});
export const validateAadhar = (fieldName) => ({
    pattern: /^\d{4}\d{4}\d{4}$/,
    message: 'Please enter valid ' + fieldName,
});
export const validateVoterId = (fieldName) => ({
    pattern: /^([a-zA-Z]){3}([0-9]){7}?$/,
    mesage: 'Please enter valid ' + fieldName,
})
