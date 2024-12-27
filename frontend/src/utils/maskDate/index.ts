export function dateMask(value: string) {
    value = value.replace(/\D/g, '');

    if (value.length <= 2) {
        return value;
    }
    if (value.length <= 4) {
        return value.replace(/^(\d{2})(\d)/, '$1/$2');
    }
    if (value.length <= 8) {
        return value.replace(/^(\d{2})(\d{2})(\d)/, '$1/$2/$3');
    }


}