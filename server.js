// express -moduuli

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(function (req, res, next) {
  // IE9 doesn't set headers for cross-domain ajax requests
  if (typeof req.headers['content-type'] === 'undefined') {
    req.headers['content-type'] = 'application/json; charset=UTF-8';
  }
  next();
});
// parse requests of content-type: application/json
//app.use(bodyParser.json())
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.text({ type: 'text/plain' }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Tanja´s application.' });
});

// set port, listen for requests
require('./app/routes/customer.routes.js')(app);
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
