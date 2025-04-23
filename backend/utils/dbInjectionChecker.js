
export function isSafe(input) {
    let stringInput = String(input);
    // Check if the input contains spaces or any special characters
    if (/\s/.test(stringInput) || /[^a-zA-Z0-9]/.test(stringInput)) {
        return false;
    }
    const isFirstLowercase = /^[a-z]$/.test(stringInput[0]);
    const isSecondNumber = /^[0-9]$/.test(stringInput[1]);

    if (!isFirstLowercase || !isSecondNumber) {
        return false;
    }

    return true; // Return true if the input is safe
}
