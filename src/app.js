const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');
// define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handelbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// setup static directory to serve
app.use(express.static(publicDirPath));
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Sandeep Bashyal',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'sandeep Bashyal',
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'you must search the term',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'you must provide  the address',
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }
      forcast(latitude, longitude, (error, forcastData) => {
        if (error) {
          return res.send({ error: error });
        }
        res.send({
          forecast: forcastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'help Text',
    helptext: 'This is help text',
    name: 'sandeep Bashyal',
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errormessage: 'help document not found',
    name: 'sandeep Bashyal',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errormessage: 'page not found',
    name: 'Sandeep Bashyal',
  });
});

app.listen(3000, () => {
  console.log('server is running');
});
