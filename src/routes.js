const express = require('express');
const UserController = require("./controllers/userController");

const routes = express.Router();

routes.post("/user", UserController.createAccount);
routes.post('/user/login', UserController.enterAccount);
routes.put('/user/editar', UserController.editAccount);
routes.delete('/user/delete', UserController.deleteAccount);

module.exports = routes;