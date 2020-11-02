const db = require("../db/db");
const Network = db.networks;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.network) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Network
    const network = new Network({
      network: req.body.network,
      proxystring: req.body.proxystring
    });
  
    // Save Network in the database
    network
      .save(network)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Network."
        });
      });
  };

exports.findAll = (req, res) => {
  
    Network.find()
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
  
    Network.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Network with id " + id });
        else res.send(data);
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Network with id=" + id });
      });
  };

exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Network.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Network with id=${id}. Maybe Network was not found!`
          });
        } else res.send({ message: "Network was updated successfully." });
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => {
        res.status(500).send({
          message: "Error updating Network with id=" + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Network.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Network with id=${id}. Maybe Network was not found!`
          });
        } else {
          res.send({
            message: "Network was deleted successfully!"
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