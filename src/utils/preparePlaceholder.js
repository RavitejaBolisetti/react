export const preparePlaceholderText = (name, prefix = true) => {
    return prefix ? 'Enter ' + name?.toLowerCase() : name;
};

export const preparePlaceholderSelect = (name) => {
    return 'Select ' + name?.toLowerCase();
};

export const preparePlaceholderAutoComplete = (name) => {
    return 'Select' + name?.toLowerCase();
};
