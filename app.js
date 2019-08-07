const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const env = require('dotenv');
env.config();

app.set('view engine', 'ejs');
app.use(cors());
app.use(
    '/public',
    express.static(path.join(__dirname, 'static'))
);
app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render('index')
});

app.get('/mm-music/privacy-policy', (req, res) => {
    res.render('privacy-policy')
});

app.get('/api/mpt-edx/toggle-registration-screen', (req, res) => {
    res.send({
        "enable-registration": process.env.MPT_SIGNUP_SCREEN
    });
})

app.listen(3000);