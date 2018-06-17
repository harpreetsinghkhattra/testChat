import * as express from 'express';
import { Operations } from '../operations/operations';
import { CommonJs } from '../operations/common';

const router = express.Router();
const CommonJsInstance = new CommonJs();

router.post('/signup', (req, res) => {
    CommonJs.validate("signup", req.body, (status, emptyKeys) => {
        if (status) {
            Operations.signup(req.body, (status, response) => {
                CommonJs.httpResponse(req, res, status, response);
            })
        } else CommonJs.httpResponse(req, res, CommonJsInstance.VALIDATE_ERROR, emptyKeys);
    })
});

router.post('/login', (req, res) => {
    CommonJs.validate("login", req.body, (status, emptyKeys) => {
        if (status) {
            Operations.login(req.body, (status, response) => {
                CommonJs.httpResponse(req, res, status, response);
            })
        } else CommonJs.httpResponse(req, res, CommonJsInstance.VALIDATE_ERROR, emptyKeys);
    })
});

module.exports = router;