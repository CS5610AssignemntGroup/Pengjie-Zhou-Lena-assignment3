const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({hi: 'there'});
})

const port = process.env.PORT || 5610;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});