const express = require('express');
const app = express();
const todoRoutes = require('./routes/api.js')
app.use(todoRoutes);

const port = process.env.PORT || 4000;

app.listen(port, function () {
    console.log('http://127.0.0.1:4000')
})