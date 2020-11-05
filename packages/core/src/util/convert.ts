export const millisecond = () => 1;
export const seconds = (n = 1) => n * 1000;

export const second = () => seconds(1);

export const minutes = (n = 1) => n * seconds(60);

export const minute = () => minutes(1);

export const hours = (n = 1) => n * minutes(60);

export const hour = () => hours(1);

export const days = (n = 1) => n * hours(24);

export const day = () => days(1);

export const weeks = (n = 1) => n * days(7);
export const week = () => {
    return weeks(1);
};

const toKilobytes = (bytes: number) => bytes / 1024;

const toMegabytes = (bytes: number) => toKilobytes(bytes) / 1024;

const toGigabytes = (bytes: number) => toMegabytes(bytes) / 1024;

export const convert = {
    to: {
        kilobytes: toKilobytes,
        megabytes: toMegabytes,
        gigabytes: toGigabytes,
    },
};
