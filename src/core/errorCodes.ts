export enum ErrorCode {
    invalid_input_parameters,
    unauthorized,
    not_found
}
export interface ExpressValidatorError {
  param: string;
  msg: string;
  value: string;
  location: 'body' | 'params' | 'query' | 'headers' | 'cookie';
}

export class ApiError extends Error {
    errorCodeObject: ErrorCodeObject;
    constructor(code: ErrorCode) {
        if (!errorsMap.has(code)) {
            super('Invalid error code thrown');
        }
        else {
            let errorCodeObject = errorsMap.get(code);
            super(errorCodeObject.message);
            this.errorCodeObject = errorCodeObject;
        }

        // restore prototype chain
        // see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class ValidationError extends Error {
    errors: ExpressValidatorError[];
    constructor(errors: ExpressValidatorError[]) {
        super('Validation error');
        this.errors = errors;

        // restore prototype chain
        // see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export interface ErrorCodeObject {
    code?: number;
    label: ErrorCode;
    message?: string;
    status: 400 | 401 | 403 | 404;
}

let errorsMap: Map<ErrorCode, ErrorCodeObject> = new Map<ErrorCode, ErrorCodeObject>();

let errors: ErrorCodeObject[] = [
    {
        code: 10001,
        label: ErrorCode.invalid_input_parameters,
        message: 'Invalid input parameters',
        status: 400
    },
    {
        label: ErrorCode.not_found,
        status: 404
    },
    {
        label: ErrorCode.unauthorized,
        status: 401
    }
];

for (let error of errors) {
    errorsMap.set(error.label, error);
}