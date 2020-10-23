export const quotedParse = (arg: string): string => {
    const regex = /((?:"(?:[^"]|(?<=\\)")*")|\S+)\s*/y;
    const regex2 = /((?:"(?:[^"]|(?<=\\)")*")|\S+)\s*/y;
    if (regex.exec(arg)) return regex2.exec(arg)[1];
    else return "";
};
