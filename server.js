const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

const root = require('path').join(__dirname, 'dist');
app.use(express.static(root));
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})

app.listen(port);

console.log("server started");