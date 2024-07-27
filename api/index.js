import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import fs from "fs";
import helmet from "helmet";
import https from "https";
import multer from "multer";
import authRoutes from "./routes/auth.js";
import comentRoutes from "./routes/coment.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
app.set("trust proxy", 1);
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET,PUT,POST,DELETE",
};
app.use(cors(corsOptions));

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Demasiadas peticiones desde esta IP, por favor intenta de nuevo después de 15 minutos.",
});
app.use("/api/", limiter);

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

// Configuración de HTTPS
const options = {
  key: fs.readFileSync("./cert/key.pem", "utf8"),
  cert: fs.readFileSync("./cert/cert.pem", "utf8"),
};

const httpsServer = https.createServer(options, app);
app.use((req, res, next) => {
  console.log(`Request received by instance ${process.env.INSTANCE_NAME}`);
  next();
});
httpsServer.listen(8800, () => {
  console.log("Conectado puerto 8800!");
});
