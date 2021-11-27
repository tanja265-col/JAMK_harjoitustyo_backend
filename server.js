// express -moduuli

const express = require('express');
//const bodyParser = require('body-parser');
const app = express();
const cors = require('cors'); //frontin yhdistämiseen

// parse requests of content-type: application/json
//app.use(bodyParser.json())
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);
//cors avaa yhteyden palvelinsovelluksen ja asiakasfrontin välille, mihin yhteys voidaan ottaa
// jos sijaitsevat eri palvelimilla
//frontendin url eli mihin fronttiin voi ottaa yhteyden
const corsOptions = {
  origin: 'http://localhost:4200', //tähän oikea osoite jos olisi oikealla palvelimella
  optionSuccessStatus: 200, //jos onnistuu, antaa tämän statuskoodin
};
//käytetään
app.use(cors(corsOptions));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'OK' });
});

// set port, listen for requests
require('./app/routes/customer.routes.js')(app);
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
