const express = require("express");
const app = express();
const dotenv = require("dotenv")
const port = 4000; 

dotenv.config()

const authRouter = require("./router/auth");
const userRouter = require("./router/user");
const bookRouter = require("./router/book");
app.use(express.json());
require("./db");
// make a middleware to set who can use books or any condition u want 
app.use('/auth', authRouter)  // recommended to put register and login in a different file to make it more secure
app.use("/user", userRouter);
app.use("/book", bookRouter);
app.listen(process.env.PORT || port, () => {
  console.log("listening on port " + port);
});
