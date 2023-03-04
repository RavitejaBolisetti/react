export const preparePlaceholder = (name, type = 'text') => {
    return type === 'text' ? 'Please Enter ' + name : type === 'select' ? 'Please Select ' + name : '';
};
