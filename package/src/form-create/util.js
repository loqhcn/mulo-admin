export function isType(arg, type) {
    return Object.prototype.toString.call(arg) === '[object ' + type + ']'
}

export function isString(arg) {
    return isType(arg, 'String');
}