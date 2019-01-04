import express from 'express';

import authenticate from '../utils/authenticate';
import { validateText, validateEmail } from '../utils/validators';

import Post from '../models/post';

let router = express.Router();

router.post('/', authenticate, (req, res) => {
    const { text } = req.body;
    const { username } = req.currentUser;

    if (!validateText(text)) {
        return res.status(400).json();
    }

    Post.create({ username, text })
        .then(result => res.json(result.attributes))
        .catch(err => res.status(500).json({ error: err }));
});

router.delete('/', authenticate, (req, res) => {
    const { id } = req.body;

    Post.destroy({ id: id })
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json({ error: err }));
});

router.put('/', authenticate, (req, res) => {
    const { id, text } = req.body;

    if (!validateText(text)) {
        return res.status(400).json();
    }

    Post.update({ text: text }, { id: id })
        .then(() => res.status(200).json())
        .catch(err => res.status(500).json({ error: err }));
});

router.get('/', (req, res) => {
    Post.collection({})
        .fetch()
        .then(posts => res.json(posts))
        .catch(err => res.status(500).json({ error: err }));
});

export default router;
