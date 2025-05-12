/**
 * Generates a NanoID-style base-36 alphanumeric ID.
 */
export const generateId = (): string => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
    const length = 15;
    let result = "";
    const array = crypto.getRandomValues(new Uint8Array(length));

    for (let i = 0; i < length; i++) {
        result += alphabet[array[i] % alphabet.length];
    }

    return result;
};
