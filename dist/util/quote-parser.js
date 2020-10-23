"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotedParse = void 0;
exports.quotedParse = (arg) => {
    const regex = /((?:"(?:[^"]|(?<=\\)")*")|\S+)\s*/y;
    const regex2 = /((?:"(?:[^"]|(?<=\\)")*")|\S+)\s*/y;
    if (regex.exec(arg))
        return regex2.exec(arg)[1];
    else
        return "";
};
