const express = require('express');
const mongoose = require('mongoose');
const app = express();
const keys = require('./config/keys');
const urlRouter = require('./routes/url');

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/url', urlRouter);

/*
//This is a test
app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});
*/

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
