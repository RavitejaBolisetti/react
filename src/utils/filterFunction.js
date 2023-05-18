import { escapeRegExp } from 'utils/escapeRegExp';

export const filterFunction = (filterString) => (title) => {
    const filterStringNew = filterString.trim();
    return title && title.match(new RegExp(escapeRegExp(filterStringNew), 'i'));
};

