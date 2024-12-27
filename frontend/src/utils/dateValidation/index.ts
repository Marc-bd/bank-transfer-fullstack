
export function dateValidation(dateString: string) {
    const [day, month, year] = dateString.split('/').map(Number);


    if (!day || !month || !year || year.toString().length !== 4) {
        return false;
    }

    const date = new Date(year, month - 1, day);

    if (
        date.getFullYear() !== year ||
        date.getMonth() + 1 !== month ||
        date.getDate() !== day
    ) {
        return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() + 10);

    return date >= today && date <= maxDate;
}