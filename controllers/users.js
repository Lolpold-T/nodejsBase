const users = require("../userData.js");

const getUsers = (req, res) => {
  res.json(users);
};

const getUser = (req, res) => {
  const id = Number(req.params.userID);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json(user);
};

const createUser = (req, res) => {
  console.log(req.body);
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const id = Number(req.params.userID);
  const index = users.findIndex((user) => user.id === id);
  const updatedUser = {
    id: users[index].id,
    name: req.body.name,
  };

  users[index] = updatedUser;
  res.status(200).json("User updated");
};

const deleteUser = (req, res) => {
  const id = Number(req.params.userID);
  const index = users.findIndex((user) => user.id === id);
  users.splice(index, 1);
  res.status(200).json("User deleted");
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
