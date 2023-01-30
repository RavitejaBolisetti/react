export const validateRequiredInputField = (fieldName) => ({
    required: true, message: 'Please enter ' + fieldName
});

export const validateEmailField = (fieldName) => ({
    type: 'email', message: 'Please enter valid ' + fieldName
})



