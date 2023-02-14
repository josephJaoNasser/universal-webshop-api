"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripHtml = exports.prune = exports.removeEscapeChars = void 0;
const removeEscapeChars = (string) => {
    return string
        .replace(/&nbsp;/gi, " ")
        .replace(/\t|\n/g, " ")
        .replace(/\s+/g, " ");
};
exports.removeEscapeChars = removeEscapeChars;
const prune = (string, length = 170) => {
    return (0, exports.removeEscapeChars)(string);
};
exports.prune = prune;
const stripHtml = (str) => {
    if (!str) {
        return "";
    }
    return (0, exports.removeEscapeChars)(str.replace(/<(?:.|\n)*?>/gm, ""));
};
exports.stripHtml = stripHtml;
