import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { BadRequestError, UnauthenticatedError } from "../error/index.js";
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please Provide all values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("The email already in use");
  }
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  await user.save();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      location: user.location,
    },
    token,
    location: user.location,
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  //check if password correct
  const token = user.createJWT();
  // user.password = undefined;
  return res
    .status(StatusCodes.OK)
    .json({ user, token, location: user.location });
};
const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;
  await user.save();
  const token = user.createJWT();
  user.password = "#";
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};
export { register, login, updateUser };
