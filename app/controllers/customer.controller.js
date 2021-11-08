/*
Kontrollerin avulla saadaan sovellukseen parempi arkkitehtuuri.
Reitit ja tietokantahakujen sovelluslogiikka on erotettu toisistaan.
CRUD-toiminnot.
*/

const db = require('../models/customer.model.js');
const Customer = db.customers;

//tietokannan käsittelymetodit olion sisässä
const CustomerController = {
  //avainarvoparit
  //findAll-metodi hakee kaikki asiakkaat
  findAll: (req, res) => {
    Customer.find((error, customers) => {
      if (error) {
        throw error;
      }
      res.json(customers);
    });
  },
  // findById hakee asiakkaan id:n perusteella
  findById: (req, res) => {
    //findOne argumentit: hakukriteeri eli _id: vastaava
    //id saadaan clientilta
    //ja callback jolla saadaan tieto
    Customer.findOne({ _id: req.params.id }, (error, customers) => {
      if (error) {
        throw error;
      }
      res.json(customer);
    });
  },
  add: (req, res, next) => {
    /* postmanissa (toimii tässä clientina) kirjoitetaan
    läheteyskenttään uusi asiakas.
    req.body:ssa saadaan backendiin lähetetty asikas.
    Menee NewCustomer-muuttujaan eli saadusta asiaksa-olista
    tehdään Customer- modelin mukainen ja se lisätään kantaan
   


    // eslint-disable-next-line new-cap
    const NewCustomer = Customer(req.body);

    NewCustomer.save((error, result) => {
      if (error) {
        throw error;
      }
      console.log('Customer added');
      res.send('Customer added');
    });
  },
  deleteCustomer: (req, res) => {
    //findOne argumentit: hakukriteeri eli _id: vastaava id saadaan clientilta
    //ja callback jolla saadaan tieto
    Customer.deleteOne({ _id: req.params.id }, (error, result) => {
      if (error) {
        throw error;
      }
      res.send('customer deleted');
    });
  },
  updateCustomer: (req, res) => {
    Customer.findOneAndUpdate(
      // eslint-disable-next-line quote-props
      { customerNumber: req.params.scode, 'customerNumber.name': req.params.name },
      //$-merkki viittaa edelliseen hakukriteeriin, set asettaa mitä bodysta tulee
      { $set: { 'customerNumber.$': req.body } },
      (error, result) => {
        if (error) {
          throw error;
        }
        res.send('Customer updated');
      }
    );
  },
  
}
*/
    // Create and Save a new Customer
    exports.create = (req, res) => {
      // Validate request
      if (!req.body) {
        res.status(400).send({
          message: 'Content can not be empty!',
        });
        return;
      }
    };
    /* Create a Customer, tässä kovakoodattuna
    
    const customer = new Customer({
      email: 'tuito@jamk.fi', //req.body.email,
      name: 'Immot Akkuit', //req.body.name,
      address: 'Jokukatu 13', //req.body.address,
      info: 'infoa', //req.body.info,
      active: '1', //req.body.active,
    });
*/
    // Create a Customer
    const customer = {
      email: req.body.email,
      name: req.body.name,
      address: req.body.address,
      info: req.body.info,
      active: req.body.active,
    };

    // Save Customer in the database
    Customer.create(customer, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the Customer.',
        });
      else res.send(data);
    });

    // Retrieve all Customers from the database.
    exports.findAll = (req, res) => {
      Customer.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || 'Some error occurred while retrieving customers.',
          });
        else res.send(data);
      });
    };

    // Find a single Customer with a customerId
    exports.findOne = (req, res) => {
      Customer.findById(req.params.customerId, (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.customerId}.`,
            });
          } else {
            res.status(500).send({
              message:
                'Error retrieving Customer with id ' + req.params.customerId,
            });
          }
        } else res.send(data);
      });
    };

    // Update a Customer identified by the customerId in the request
    exports.update = (req, res) => {
      // Validate Request
      if (!req.body) {
        res.status(400).send({
          message: 'Content can not be empty!',
        });
      }

      customer.updateById(
        req.params.customerId,
        new customer(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === 'not_found') {
              res.status(404).send({
                message: `Not found Customer with id ${req.params.customerId}.`,
              });
            } else {
              res.status(500).send({
                message:
                  'Error updating Customer with id ' + req.params.customerId,
              });
            }
          } else res.send(data);
        }
      );
    };

    // Delete a Customer with the specified customerId in the request
    exports.delete = (req, res) => {
      Customer.remove(req.params.customerId, (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.customerId}.`,
            });
          } else {
            res.status(500).send({
              message:
                'Could not delete Customer with id ' + req.params.customerId,
            });
          }
        } else res.send({ message: `Customer was deleted successfully!` });
      });
    };

    // Delete all Customers from the database.
    exports.deleteAll = (req, res) => {
      Customer.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message ||
              'Some error occurred while removing all customers.',
          });
        else res.send({ message: `All Customers were deleted successfully!` });
      });
    };

    /* ex: getProperty(myObj,'aze.xyz',0) // return myObj.aze.xyz safely
 * accepts array for property names:
 *     getProperty(myObj,['aze','xyz'],{value: null})

function getProperty(obj, props, defaultValue) {
  var res,
    isvoid = function (x) {
      return typeof x === 'undefined' || x === null;
    };
  if (!isvoid(obj)) {
    if (isvoid(props)) props = [];
    if (typeof props === 'string') props = props.trim().split('.');
    if (props.constructor === Array) {
      res =
        props.length > 1
          ? getProperty(obj[props.shift()], props, defaultValue)
          : obj[props[0]];
    }
  }
  return typeof res === 'undefined' ? defaultValue : res;

}
 */
    module.exports = CustomerController;
  },
};
