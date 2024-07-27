import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fs from "fs";
import https from "https";
import multer from "multer";
import authRoutes from "./routes/auth.js";
import comentRoutes from "./routes/coment.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET,PUT,POST,DELETE",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;

  res.status(200).json(file.filename);
});
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/coment", comentRoutes);

const options = {
  key: fs.readFileSync("./cert/key.pem", "utf8"),
  cert: fs.readFileSync("./cert/cert.pem", "utf8"),
};

const httpsServer = https.createServer(options, app);

httpsServer.listen(8800, () => {
  console.log("Conectado puerto 8800!");
});
