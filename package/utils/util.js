export function isType(arg, type) {
    return Object.prototype.toString.call(arg) === '[object ' + type + ']'
}

export function isString(arg) {
    return isType(arg, 'String');
}

/**
 * 
 * return 类型 全部小写
 */
export function getType(arg) {
    let type = Object.prototype.toString.call(arg);
    let str = type.match(/\[\w+\s(\w+)\]/);
    if (!str) {
        return false;
    }
    str = str[1];
    str = str.replace(str[0], str[0].toLowerCase());
    return str;
}