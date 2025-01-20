const manageClientModel = require('../models/manageClientModel.js');
const { validateForm, handleValidationErrors } = require('../common/validators.js');


//Get all client details
exports.getClient = (req, res) => {
  manageClientModel.getClient((err, users) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch users' });
    const formattedRows = users.map(user => Object.values(user));
    res.status(200).json(formattedRows);
  });
};
//Add New client
exports.addClient = [...validateForm,handleValidationErrors,(req, res) => {
  const addClientData = req.body;
  manageClientModel.addClientData(addClientData, (err, user) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    res.status(201).send({ message: 'User added successfully'});
  });
}];
//Get client details by ID
exports.getClientDetailById = (req,res)=>{
  const getClientData = req.body;
  manageClientModel.getClientDetailById(getClientData, (err, user) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch users' });
    res.status(200).json(user.rows);
  });
}
//Edit client
exports.editClient = (req, res) => {
  const editClientData = req.body;
  manageClientModel.editClientData(editClientData, (err, user) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    res.status(201).send({ message: 'User edited successfully'});
  });
};
//Delete client
exports.deleteClient = (req, res) => {
  const deleteClientData = req.body;
  manageClientModel.deleteClient(deleteClientData, (err, user) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    res.status(201).send({ code: '200',message: 'User deleted successfully'});
  });
};