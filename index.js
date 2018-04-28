const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

const userMiddleware = (req, res, next) => {
  if (req.body.name && req.body.birthday) next();
  else res.render('main');
};

app.get('/', (req, res) => {
  res.render('main');
});

app.post('/check', userMiddleware, (req, res) => {
  const { name, birthday } = req.body;
  /**
   * Não consegui a data no formato DD/MM/YYYY desde o input type=date
   */
  const idade = moment().diff(moment(birthday, 'YYYY/MM/DD'), 'years');

  if (idade >= 18) {
    res.render('major', { name });
  } else {
    res.render('minor', { name });
  }
});

app.get('/major', (req, res) => {
  res.redirect('/');
});
app.get('/minor', (req, res) => {
  res.redirect('/');
});

app.listen(3000);
