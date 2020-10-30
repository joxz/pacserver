const db = require("../db");
const Exception = db.exceptions;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.domain) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create an Exception
    const exception = new Exception({
      domain: req.body.domain,
      proxystring: req.body.proxystring
    });
  
    // Save exception in the database
    exception
      .save(exception)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the exception."
        });
      });
  };

exports.findAll = (req, res) => {
  
    Exception.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving networks."
        });
      });
  };

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Exception.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Exception with id " + id });
        else res.send(data);
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Exception with id=" + id });
      });
  };

exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Exception.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Exception with id=${id}. Maybe Exception was not found!`
          });
        } else res.send({ message: "Exception was updated successfully." });
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => {
        res.status(500).send({
          message: "Error updating Exception with id=" + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Exception.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Exception with id=${id}. Maybe Exception was not found!`
          });
        } else {
          res.send({
            message: "Exception was deleted successfully!"
          });
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Network with id=" + id
        });
      });
  };