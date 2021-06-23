export const quotedParse = (arg: string): string => {
    const regex = /((?:"(?:[^"]|(?<=\\)")*")|\S+)\s*/y;
    const regex2 = /((?:"(?:[^"]|(?<=\\)")*")|\S+)\s*/y;
    if (regex.exec(arg)) {
        const res = regex2.exec(arg);
        if (res) return res[1];
        else return "";
    } else return "";
};
