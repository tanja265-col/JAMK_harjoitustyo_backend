/*
Kontrollerin avulla saadaan sovellukseen parempi arkkitehtuuri.
Reitit ja tietokantahakujen sovelluslogiikka on erotettu toisistaan.
CRUD-toiminnot.
*/

const db = require('../models/customer.model.js');
const Customer = db.customers;

const userCon = require('../controllers/UserController'); // user-reittien kontrolleri

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

    module.exports = CustomerController;
  },
};
