
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';

export default function (req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    let token = (authorizationHeader || '').split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: err.name === 'TokenExpiredError' ?
                    'Token expired' : 'Failed to authenticate'
            });
        }
        
        User.query({
            where: { username: decoded.username },
            select: [ '*' ]
        }).fetch()
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'No such user' });
                } 
                
                req.currentUser = user.attributes;
                
                next();
        });
    });
}