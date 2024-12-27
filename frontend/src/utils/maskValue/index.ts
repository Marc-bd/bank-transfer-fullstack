export function valueMask(value: string) {
    value = value
        .replace('.', '')
        .replace(',', '')
        .replace(/[^\d-]/g, '');

    const options = { minimumFractionDigits: 2 };


    const finalValue = new Intl.NumberFormat('pt-BR', options).format(
        parseFloat(value) / 100
    );

    if (value === '0') {
        return '0,00';
    }

    if (value === '00') {
        return '';
    }

    return finalValue === 'NaN' ? '' : finalValue;
}