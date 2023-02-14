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
