const express = require('express');
const router = express.Router();
const shortId = require('shortid');
const Url = require('../models/Url');
const keys = require('../config/keys');

const baseUrl = keys.baseUrl;

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
                const fullShortUrl = baseUrl + '/url' + doc.shortUrl;
                res.status(200).json({
                    message: `Url changed to ${doc.shortUrl}`,
                    fullShortUrl: fullShortUrl,
                });
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
            const fullShortUrl = `${baseUrl}/url/${shortUrl}`;
            res.status(201).json({
                message: `Created a short url ${fullShortUrl}`,
                fullShortUrl: fullShortUrl,
            });
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
            const fullShortUrl = baseUrl + '/url' + req.body.shortUrl;
            res.status(201).json({
                message: `Created a short url ${fullShortUrl}`,
                fullShortUrl: fullShortUrl,
            });
        } else {
            return res.status(400).json("Can't create short url");
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json('Server Error');
    }
});

module.exports = router;
