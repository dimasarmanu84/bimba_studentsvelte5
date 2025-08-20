export const isNull = (value) => {
    if (value === null || value === undefined || value === '')
        return true;
    return false;
};
export const isNotNull = (value) => { return !isNull(value); };
export const stringify = (value = null) => {
    return String(value)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
};
export const isObject = (value) => {
    if (typeof value !== 'object')
        return false;
    else if (value === null)
        return false;
    else if (Array.isArray(value))
        return false;
    return true;
};
export const isObjectArray = (value) => {
    if (typeof value !== 'object')
        return false;
    else if (value === null)
        return false;
    return true;
};
