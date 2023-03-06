import {zeroDateFix} from "~/helpers/zeroDateFix";

function filterDate(date: string) {
    const newDate = new Date(date);
    return `${zeroDateFix(newDate.getDate())}:${zeroDateFix(
        newDate.getMonth()
    )}:${newDate.getFullYear()}`;
}

export default filterDate;