import {body} from 'express-validator';


export const rules = (() => {
    return [
        body('firstName').notEmpty(),
        body('lastName').notEmpty(),
        body('email').isEmail(),
        body('password').isLength({min: 6})
    ];
})();