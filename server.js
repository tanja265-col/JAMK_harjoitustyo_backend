// express -moduuli importataan

const express = require('express');
//const bodyParser = require('body-parser'); // vanhentunut
const app = express();

// parse requests of content-type: application/json
// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Tanja´s application.' });
  res.send('Hello');
});

// set port, listen for requests
require('./app/routes/customer.routes.js')(app);
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
