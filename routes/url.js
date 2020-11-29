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
                doc.shortUrl = req.body.shortUrl;
                doc.save();
                res.json(`Url changed to ${doc.shortUrl}`);
            }
        );
    } catch (err) {
        console.error(err.message);
        return res.status(500).json('Server Error');
    }
});

router.post('/unbranded', async (req, res) => {
    try {
        // res.json(req.body);
        const shortUrl = shortId.generate();
        const url = await Url.create({
            longUrl: req.body.longUrl,
            shortUrl: shortUrl,
        });

        if (url) {
            res.json(shortUrl);
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
            res.json(`Url ${req.body.shortUrl} created`);
        } else {
            return res.status(400).json("Can't create short url");
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json('Server Error');
    }
});

module.exports = router;
