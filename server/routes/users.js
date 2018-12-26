import express from 'express';
// import bcrypt from 'bcrypt';

import User from '../models/user';

let router = express.Router();


function validateInput(data) {
    let errors = {};

    return User.query({
        where: { email: data.email },
        orWhere: { username: data.username }
    }).fetch().then(user => {
        console.log(user);

        if (user) {
            if (user.get('username') === data.username) {
                errors.username = 'There is user with such username';
            }

            if (user.get('email') === data.email) {
                errors.email = 'There is user with such email';
            }
        }

        return errors;
    });
}

router.post('/', (req, res) => {
    validateInput(req.body)
        .then(({ errors }) => {
            if (errors) {
                return res.status(400).json(errors);
            }

            const { username, password, email } = req.body;
            // const password_digest = bcrypt.hashSync(password, 10);
            const password_digest = password;
        
            User.forge({
                username, email, password_digest
            }, {
                hasTimestamps: true
            }).save()
            .then(user => res.json({ success: true }))
            .catch(err => res.status(500).json({ error: err }));
        });
    // res.status(404).json({ error: 'Not Found Again' });
});

export default router;
