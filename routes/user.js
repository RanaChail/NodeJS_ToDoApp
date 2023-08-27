import express from "express";
import {
  userRegister,
  getUserall,
  userLogin,
  getMyprofile,
  userLogout,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//Get all user data
router.get("/all", getUserall);

//Register a new user data
router.post("/new", userRegister);

//Login post request
router.post("/login", userLogin);

//Logout post request
router.get("/logout", userLogout);

//Find user by ID
router.get("/me", isAuthenticated, getMyprofile);

/*
//Update user data by ID
router.put("/userid/:id", updateUser);

//Delete the user data
router.delete("/userid/:id", deleteUser);
*/

export default router;
