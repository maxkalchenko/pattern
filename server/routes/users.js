import express from 'express';
// import bcrypt from 'bcrypt';
import { validateUnique, validateEmail, validateText, validatePassword } from '../utils/validators';
import User from '../models/user';

let router = express.Router();

router.post('/', (req, res) => {
    const { username, password, confirmPassword, email } = req.body;
    let error = {};

    if (!validateEmail(email)) {
        error.email = 'Invalid email';
    }

    if (!validateText(username)) {
        error.username = 'Invalid username';
    }
    
    if (!validatePassword(password, confirmPassword)) {
        error.password = 'Invalid password';
    }

    if (Object.keys(error).length) {
        return res.status(400).json(error);
    }

    validateUnique(req.body, User, 'email', 'username')
        .then(errors => {
            if (errors) {
                return res.status(400).json(errors);
            }

            // const password_digest = bcrypt.hashSync(password, 10);
            const password_digest = password;
        
            User.forge({
                username, email, password_digest
            }, {
                hasTimestamps: true
            }).save()
            .then(() => res.json({ success: true }))
            .catch(err => res.status(500).json({ error: err }));
        });
});

export default router;
