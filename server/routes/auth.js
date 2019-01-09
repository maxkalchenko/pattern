import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config';

let router = express.Router();

let refreshTokens = {};

router.post('/', (req, res) => {
    getUser(req.body, res);
});


router.post('/refresh', (req, res) => {
    const { refresh_token } = req.body;

    let user = refreshTokens[refresh_token];

    delete refreshTokens[refresh_token];

    if (!user) {
        return res.status(404).json({ errors: 'Not found' });
    }

    getUser(user, res);
});

function getUser(user, res) {
    const { identifier, password } = user;

    User.query({
        where: { username: identifier },
        orWhere: { email: identifier }
    }).fetch().then(user => {
        if (user && password === user.get('password_digest')) {
            let refresh = Date.now().toString();

            refreshTokens[refresh] = { identifier, password };

            res.json({
                access_token: jwt.sign({
                    username: user.get('username')
                }, config.jwtSecret, {
                    // options:
                    expiresIn: config.expiresIn
                }),
                // TODO: refactor
                refresh_token: refresh
            });

            return;
        }
        
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    });
}

export default router;
