const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const keys = require('./config/keys');
const urlRouter = require('./routes/url');

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/url', urlRouter);

if (process.env.NODE_ENV === 'production') {
    //express will use assets in client/build
    app.use(express.static('client/build'));

    //if not found in client/build
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
