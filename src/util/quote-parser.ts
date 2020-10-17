export const parseQuoted = (arg: string): string => {
    const regex = /((?:"(?:[^"]|(?<=\\)")*")|\S+)\s*/y;
    // The y flag makes the start index increment each time it is ran, so we need two copies so it doesn't skip when we run it for the while loop condition
    const regex2 = /((?:"(?:[^"]|(?<=\\)")*")|\S+)\s*/y;
    if (regex.exec(arg)) return regex2.exec(arg)[1];
    else return "";
};
