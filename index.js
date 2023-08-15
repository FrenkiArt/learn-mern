import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations/validations.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { UserController, PostController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://artywork:1Artywork@cluster0.zppxpbn.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB is OK");
  })
  .catch((err) => {
    console.log("DB is Error", err);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());

const htmlBody = (slot) => {
  return `
  <head></head>
  <body>
    <h1>Страница</h1>
    ${slot}
  </body>
`;
};

app.get("/", (req, res) => {
  res.send(htmlBody("hehe"));
});

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/uploads", checkAuth, upload.single("image"), async (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
app.use("/uploads", express.static("uploads"));

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.removeOne);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
