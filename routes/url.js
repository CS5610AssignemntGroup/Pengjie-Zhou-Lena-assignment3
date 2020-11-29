const express = require('express');
const router = express.Router();
const shortId = require('shortid');
const Url = require('../models/Url');

router.get('/:shortUrl', async (req, res) => {
    try {
        const url = await Url.findOne({ shortUrl: req.params.shortUrl });

        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res
                .status(404)
                .json(`No url found for ${req.params.shortUrl}`);
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json('Server Error');
    }
});

router.put('/:shortUrl/edit', async (req, res) => {
    try {
        const url = await Url.findOne(
            { shortUrl: req.params.shortUrl },
            (err, doc) => {
                if (err) {
                    return res
                        .status(404)
                        .json(`No url found for ${req.params.shortUrl}`);
                }
                doc.name = req.body.shortUrl;
                doc.save();
            }
        );
    } catch (err) {
        console.error(err.message);
        return res.status(500).json('Server Error');
    }
});

router.post('/unbranded', async (req, res) => {
    try {
        const url = await Url.create({
            longUrl: req.body.longUrl,
            shortUrl: shortId.generate(),
        });

        if (url) {
            return res.redirect('/');
        } else {
            return res.status(400).json("Can't create short url");
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json('Server Error');
    }
});

router.post('/branded', async (req, res) => {
    try {
        const url = await Url.create({
            longUrl: req.body.longUrl,
            shortUrl: req.body.shortUrl,
        });

        if (url) {
            return res.redirect('/');
        } else {
            return res.status(400).json("Can't create short url");
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json('Server Error');
    }
});

module.exports = router;
