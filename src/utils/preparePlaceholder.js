export const preparePlaceholderText = (name, prefix = true) => {
    return prefix ? 'Enter ' + name : name;
};

export const preparePlaceholderSelect = (name) => {
    return 'Select ' + name;
};

export const preparePlaceholderAutoComplete = (name) => {
    return 'Select' + name;
};
