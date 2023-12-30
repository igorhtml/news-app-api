const userService = require("../services/user.service");
const mongoose = require("mongoose");

const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;
    if (!name || !username || !email || !password || !avatar || !background) {
      return res
        .status(400)
        .send({ message: "Submit all fields for registration!" });
    }

    const user = await userService.createService(req.body);

    if (!user) {
      return res.status(400).send({ message: "Error creating user" });
    }

    res.status(201).send({
      message: "User created successfully",
      user: {
        id: user._id,
        name: name,
        username: username,
        email: email,
        password: password,
        avatar: avatar,
        background: background,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAllService();

    if (users.lenght === 0) {
      return res.status(400).send({ message: "No users registered" });
    }

    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;
    if (!name && !username && !email && !password && !avatar && !background) {
      return res
        .status(400)
        .send({ message: "Submit at least one field to update" });
    }

    const { id, user } = req;

    await userService.updateService(
      id,
      name,
      username,
      email,
      password,
      avatar,
      background
    );

    res.send({ message: "User successfully updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { create, findAll, findById, update };
