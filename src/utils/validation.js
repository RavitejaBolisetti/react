export const validateRequiredInputField = (fieldName) => ({
    required: true,
    message: 'Please Enter ' + fieldName,
});

export const validateRequiredSelectField = (fieldName) => ({
    required: true,
    message: 'Please Select ' + fieldName,
});

export const validateEmailField = (fieldName) => ({
    type: 'email',
    message: 'Please Enter Valid ' + fieldName,
});

export const validationFieldLetterAndNumber = (fieldName) => ({
    pattern: /^[A-Za-z0-9]*$/,
    message: 'Please Use Only Letters and Numbers In ' + fieldName,
});

export const validatePanField = (fieldName) => ({
    pattern: /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/,
    message: 'Please Enter Valid ' + fieldName,
});

export const validateVehicleRegistrationField = (fieldName) => ({
    pattern: /^[0-9]{2}BH[0-9]{4}[A-HJ-NP-Z]{2}$/,
    message: 'Please Enter Valid ' + fieldName,
});

export const validateMobileNoField = (fieldName) => ({
    pattern: /^([5-9]){1}([0-9]){9}$/,
    message: 'Please Enter Valid ' + fieldName,
});
