export const escapeRegExp = (string) => {
    return string.toString().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
