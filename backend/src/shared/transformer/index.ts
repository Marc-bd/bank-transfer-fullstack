import Decimal from "decimal.js"

export class DecimalColumnTransformer {


    to(data: number): number {
        const decimal = new Decimal(data)

        return decimal.toDecimalPlaces(2).toNumber()

    }
    from(data: string): number {
        const decimal = new Decimal(data)

        return  decimal.toDecimalPlaces(2).toNumber()
    }
}