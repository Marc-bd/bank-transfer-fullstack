class AppError extends Error {
    statusCode: number;
    errors: string[];

    constructor(statusCode: number, errors: string | { errors: string[] }) {
        if (typeof errors === 'string') {
            super(errors);
            this.errors = [errors];
        } else {
            super(errors.errors.join(", "));
            this.errors = errors.errors;
        }
        this.statusCode = statusCode;
    }
}

export { AppError };