import User from "../models/User.js";

const createUserService = (body) => {
  return User.create(body);
};

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

const updateService = (
  id,
  name,
  username,
  email,
  password,
  avatar,
  background
) =>
  User.findOneAndUpdate(
    { _id: id },
    { name, username, email, password, avatar, background }
  );

export default {
  createUserService,
  findAllService,
  findByIdService,
  updateService,
};
