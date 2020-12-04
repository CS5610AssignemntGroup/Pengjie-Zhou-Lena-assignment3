const express = require('express');
const router = express.Router();
const shortId = require('shortid');
const Url = require('../models/Url');
const keys = require('../config/keys');

const baseUrl = keys.baseUrl;

router.get('/:shortUrl', async (req, res) => {
    try {
        const url = await Url.findOne({ shortUrl: req.params.shortUrl });
        const fullShortUrl = `${baseUrl}/url/${req.params.shortUrl}`;
        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json({
                message: `No url found for ${fullShortUrl}`,
            });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server Error' });
    }
});

router.put('/:shortUrl/edit', async (req, res) => {
    try {
        const url = await Url.findOne(
            { shortUrl: req.params.shortUrl },
            (err, doc) => {
                //if users try to edit a URL that doesn’t exist
                const fullShortUrl = baseUrl + '/url/' + doc.shortUrl;
                if (err) {
                    return res.status(404).json({
                        message: `No url found for ${fullShortUrl}`,
                    });
                }
                doc.longUrl = req.body.longUrl;
                doc.save();

                return res.status(200).json({
                    message: `Long Url for ${fullShortUrl} changed to ${doc.longUrl}`,
                    fullShortUrl: fullShortUrl,
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/:shortUrl', async (req, res) => {
    try {
        await Url.deleteOne({ shortUrl: req.params.shortUrl }, err => {
            const fullShortUrl = `${baseUrl}/url/${req.params.shortUrl}`;
            if (err) {
                return res.status(404).json({
                    message: `Can't delete ${fullShortUrl}`,
                });
            }
            return res.status(200).json({
                message: `Successfully delete ${fullShortUrl}`,
            });
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/unbranded', async (req, res) => {
    try {
        //check if there is existed long url
        const longUrlExisted = await checkExistedUrl(
            req,
            res,
            { longUrl: req.body.longUrl },
            'There exist a short url for your long url'
        );

        if (longUrlExisted) {
            return;
        }

        //if there is no existed url, we create one
        const shortUrl = shortId.generate();
        const url = await Url.create({
            longUrl: req.body.longUrl,
            shortUrl: shortUrl,
        });

        if (url) {
            const fullShortUrl = `${baseUrl}/url/${shortUrl}`;
            return res.status(201).json({
                message: `Created a short url ${fullShortUrl}`,
                fullShortUrl: fullShortUrl,
            });
        } else {
            return res.status(400).json({ message: "Can't create short url" });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/branded', async (req, res) => {
    try {
        //check if there is an existed long url
        const longUrlExisted = await checkExistedUrl(
            req,
            res,
            { longUrl: req.body.longUrl },
            'There exist a short url for your long url'
        );

        //check if there is existed branded short url
        const brandedUrlExisted = await checkExistedUrl(
            req,
            res,
            { shortUrl: req.body.shortUrl },
            'There exist a branded short url as your input, you can edit it'
        );

        if (longUrlExisted || brandedUrlExisted) {
            return;
        }

        const url = await Url.create({
            longUrl: req.body.longUrl,
            shortUrl: req.body.shortUrl,
        });

        if (url) {
            const fullShortUrl = baseUrl + '/url/' + req.body.shortUrl;
            return res.status(201).json({
                message: `Created a short url ${fullShortUrl}`,
                fullShortUrl: fullShortUrl,
            });
        } else {
            return res.status(400).json({
                message: "Can't create short url",
            });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server Error' });
    }
});

const checkExistedUrl = async (req, res, query, message) => {
    //check if there is an existed url
    const existedUrl = await Url.findOne(query);
    if (existedUrl) {
        const fullShortUrl = `${baseUrl}/url/${existedUrl.shortUrl}`;
        res.status(200).json({
            message: message,
            fullShortUrl: fullShortUrl,
        });
        return true;
    } else {
        return false;
    }
};

module.exports = router;
