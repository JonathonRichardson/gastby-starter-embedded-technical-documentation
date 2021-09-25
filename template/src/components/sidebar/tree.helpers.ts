// https://stackoverflow.com/a/55971696/4339894
export const partition = <T>(array: T[], isValid: (element: T) => boolean): [T[], T[]] => {
    const pass: T[] = [];
    const fail: T[] = [];
    array.forEach((element) => {
        if (isValid(element)) {
            pass.push(element);
        } else {
            fail.push(element);
        }
    });
    return [pass, fail];
};
