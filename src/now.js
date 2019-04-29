
// Returns a string where leading zeroes are added until numDigits is reached.
function lz(val, numDigits) {
    let retVal = val.toString();
    while (retVal.length < numDigits) {
        retVal = "0" + retVal;
    }
    return retVal;
}


function dateTime(year, month, date, hours, minutes, seconds) {

    let retVal = `${year}-${lz(month + 1, 2)}-${lz(date, 2)} ${lz(hours, 2)}:${lz(minutes, 2)}:${lz(seconds, 2)}`;

    let ampm = "am";
    if (hours >= 12) {
        hours -= 12;
        ampm = "pm";
    }

    if (hours === 0) {
        hours = 12;
    }

    retVal += ` (${lz(hours, 2)}:${lz(minutes, 2)}:${lz(seconds, 2)} ${ampm})`;
    return retVal;
}

const now = new Date();
console.log(`UTC:   ${dateTime(now.getUTCFullYear(),
                               now.getUTCMonth(),
                               now.getUTCDate(),
                               now.getUTCHours(),
                               now.getUTCMinutes(),
                               now.getUTCSeconds())}`
);

const tzHourOffset = -1 * now.getTimezoneOffset() / 60;
const tzStr = tzHourOffset >= 0 ? `GMT+${tzHourOffset}`: `GMT${tzHourOffset}`;

console.log(`Local: ${dateTime(now.getFullYear(),
                               now.getMonth(),
                               now.getDate(),
                               now.getHours(),
                               now.getMinutes(),
                               now.getSeconds())} ${tzStr}`
);
