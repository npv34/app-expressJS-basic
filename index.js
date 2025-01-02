const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./src/route/router');

const app = express();
const PORT = 3001;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// config static files
app.use(express.static(path.join(__dirname, 'public')));

// config views engine
app.set('views', path.join(__dirname, './src/view')); 
app.set('view engine', 'ejs');

// router
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});