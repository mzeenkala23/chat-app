import {body} from 'express-validator';


export const rules = (() => {
    return [
        body('email').isEmail(),
    ];
})();