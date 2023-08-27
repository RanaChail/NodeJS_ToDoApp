import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getUserall = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

//Register a new user
export const userRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User Already Exist", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    //Call the sendcookie function
    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

//User login function
export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const getMyprofile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const userLogout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      success: true,
      user: "Logout Successfully",
    });
};

/*
export const updateUser = async (req, res) => {
  //Here /userid/:id that :id deifine everything after '/' is consider as id.
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({
    success: true,
    message:"Updated",
  });
};


export const deleteUser = async (req, res) => {
  //Here /userid/:id that :id deifine everything after '/' is consider as id.
  const { id } = req.params;
  const user = await User.findById(id);

  await user.deleteOne();

  res.json({
    success: true,
    message:"Deleted",
  });
};
*/
