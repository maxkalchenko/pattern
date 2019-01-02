import express from 'express';

import Post from '../models/post';

let router = express.Router();

router.post('/', (req, res) => {
    const { username, text } = req.body;

    if (!username || !text) {
        return res.status(400).json();
    }

    Post.forge({
        username, text
    }, {
        hasTimestamps: true
    }).save()
    .then(() => res.json({ success: true }))
    .catch(err => res.status(500).json({ error: err }));
});

router.get('/', (req, res) => {
    Post.collection({})
        .fetch()
        .then(posts => {
            res.json(posts);
        });
});

// router.put('/', (req, res) => {});
// router.delete('/', (req, res) => {});

export default router;
