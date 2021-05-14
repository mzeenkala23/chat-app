import {body} from 'express-validator';


export const rules = (() => {
    return [
        body('firstName').optional().notEmpty(),
        body('lastName').optional().notEmpty(),
        body('email').optional().isEmail(),
        body('password').optional().isLength({min: 6})
    ];
})();