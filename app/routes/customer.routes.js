const CustomerController = require('../controllers/customer.controller.js');

module.exports = (app) => {
  const customers = require('../controllers/customer.controller.js');

  const router = require('express').Router();

  // Create a new Customer
  //router.post('/', customers.create);
  router.post('/customers', function (req, res) {
    customers.create;
  });

  // Retrieve all Customers
  router.get('/', function (req, res) {
    customers.findAll;
  });

  // Retrieve a single Customer with customer´s Id
  router.get('/:id', function (req, res) {
    customers.findOne;
  });

  // Update a Customer with id
  router.put('/:id', function (req, res) {
    customers.update;
  });

  // Delete a Customer with id
  router.delete('/:id', function (req, res) {
    customers.delete;
  });

  // Delete all Customers
  router.delete('/', function (req, res) {
    customers.deleteAll;
  });

  app.use('/api/customers', router);
};
