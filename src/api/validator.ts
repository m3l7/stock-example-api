import { ValidationError } from '../core/errorCodes';
import {validationResult} from 'express-validator/check';
/**
 * Validator middleware for express-validator
 *
 * @export
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns
 */
export function expressValidator(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new ValidationError(errors.array()));
    }

    next();
}