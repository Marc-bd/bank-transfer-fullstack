import { parse, isValid, startOfDay, isPast} from 'date-fns';

export function dateValidation(dateString: string) {
    const date = parse(dateString, 'dd/MM/yyyy', new Date())

    if(!isValid(date)) {
        return false
    }

   const dateZeroMinutes = startOfDay(date)
   const todayZeroMinutes = startOfDay(new Date())

    return dateZeroMinutes >= todayZeroMinutes



}