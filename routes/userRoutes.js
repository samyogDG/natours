const express = require("express");

const userController = require("../controllers/userController");
const authController = require("./../controllers/authController");

const userRouter = express.Router();

userRouter.post("/signup", authController.signup);
userRouter.post("/login", authController.login);
userRouter.get("/logout", authController.logout);
userRouter.post("/forgetPassword", authController.forgetPassword);
userRouter.patch("/resetPassword/:token", authController.resetPassword);

//protect all routes after this route
userRouter.use(authController.protect);

userRouter.patch("/updateMyPassword", authController.updatePassword);
userRouter.get("/Me", userController.getMe, userController.getUser);
userRouter.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
userRouter.delete("/deleteMe", userController.deleteMe);

//restric all routes after this
userRouter.use(authController.restrictTo("admin"));

userRouter
  .route("/")
  .get(userController.getAllusers)
  .post(userController.createUser);

userRouter
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
