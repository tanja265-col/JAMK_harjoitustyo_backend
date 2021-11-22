const express = require('express');
const CustomerController = require('../controllers/customer.controller.js');

module.exports = (app) => {
  const customers = require('../controllers/customer.controller.js');

  const router = require('express').Router();

  const authorize = require('../verifytoken'); //authorisointi

  // Create a new Customer
  //router.post('/', customers.create);
  // http://localhost:3000/customers/
  // router.post('/', authorize, Customer.controller.add);

  //authorize, - laitetaan muihin kuin get
  // kaikki reitti joiden kautta voidaan muokata kanta on tällä suojattu
  //****************** */

  router.post('/customers', authorize, function (req, res) {
    customers.create;
  });

  // Retrieve all Customers
  // http://localhost:3000/customers/
  router.get('/', function (req, res) {
    customers.findAll;
  });

  // Retrieve a single Customer with customer´s Id
  // http://localhost:3000/customers/id
  router.get('/:id', function (req, res) {
    customers.findOne;
  });

  // Update a Customer with id
  // http://localhost:3000/customers/id
  //: reitissä tarkoittaa muttujaa jonka arvoi voi vaihtua
  router.put('/:id', authorize, function (req, res) {
    customers.update;
  });

  // Delete a Customer with id
  // http://localhost:3000/customers/id
  router.delete('/:id', authorize, function (req, res) {
    customers.delete;
  });

  // Delete all Customers
  // http://localhost:3000/customers
  router.delete('/', authorize, function (req, res) {
    customers.deleteAll;
  });

  app.use('/api/customers', router);
};
