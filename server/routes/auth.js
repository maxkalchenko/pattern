import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config';

let router = express.Router();

router.post('/', (req, res) => {
    const { identifier, password } = req.body;

    User.query({
        where: { username: identifier },
        orWhere: { email: identifier }
    }).fetch().then(user => {
        if (user && password === user.get('password_digest')) {
            res.json({
                access_token: jwt.sign({
                    username: user.get('username')
                }, config.jwtSecret, {
                    // options:
                    expiresIn: '1h'
                }),
                // TODO: refactor
                refresh_token: Date.now().toString()
            });

            return;
        }
        
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    });
});

export default router;
