export function zeroDateFix(date: number): string {
    if (date < 10) {
        return '0' + date
    }
    return String(date);
}
