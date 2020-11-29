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
            return res.status(404).json({
                message: `No url found for ${req.params.shortUrl}`,
            });
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
                //if users try to edit a URL that doesn’t exist
                if (err) {
                    return res.status(404).json({
                        message: `No url found for ${req.params.shortUrl}`,
                    });
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

router.delete('/:shortUrl', async (req, res) => {
    try {
        await Url.deleteOne({ shortUrl: req.params.shortUrl }, err => {
            if (err) {
                return res.status(404).json({
                    message: `Can't delete ${req.params.shortUrl}`,
                });
            }
            res.status(200).json({
                message: `Successfully delete ${req.params.shortUrl}`,
            });
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json('Server Error');
    }
});

router.post('/unbranded', async (req, res) => {
    try {
        await checkExistedLongUrl(req, res);
        await checkExistedBrandedUrl(req, res);

        //if there is no existed url, we create one
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
        //check if there is an existed url
        await checkExistedLongUrl(req, res);

        const longUrl = req.body.longUrl;
        const url = await Url.create({
            longUrl: longUrl,
            shortUrl: req.body.shortUrl,
        });

        if (url) {
            const fullShortUrl = baseUrl + '/url' + req.body.shortUrl;
            res.status(201).json({
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
        return res.status(500).json('Server Error');
    }
});

//if the same long URL is submitted by multiple users, we return the already existing URL
const checkExistedLongUrl = async (req, res) => {
    const longUrl = req.body.longUrl;

    //check if there is an existed long url
    const existedUrl = await Url.findOne({ longUrl: longUrl });
    if (existedUrl) {
        const fullShortUrl = `${baseUrl}/url/${existedUrl.shortUrl}`;
        res.status(200).json({
            message: `There exist a short url for your long url`,
            fullShortUrl: fullShortUrl,
        });
    }
};

//if a user requests a branded URL that already exists
const checkExistedBrandedUrl = async (req, res) => {
    const longUrl = req.body.longUrl;
    const shortUrl = req.body.shortUrl;

    //check if there is an existed short branded url
    const existedUrl = await Url.findOne({ shortUrl: shortUrl });
    if (existedUrl) {
        const fullShortUrl = `${baseUrl}/url/${existedUrl.shortUrl}`;
        res.status(200).json({
            message: `There exist a branded short url for your long url, you can edit it`,
            fullShortUrl: fullShortUrl,
        });
    }
};

module.exports = router;
