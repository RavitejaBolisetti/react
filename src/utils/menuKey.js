export const getMenyKey = (key) => key.toLowerCase();

export const getMenuValue = (dataSet, key, subKey = '') => {
    return subKey ? dataSet[getMenyKey(key)]?.[subKey] : dataSet[getMenyKey(key)];
};
