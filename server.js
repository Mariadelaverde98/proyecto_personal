const express = require("express");
const app = express();
const router = require("./routes/routes")
const cookieParser = require('cookie-parser');
const multer = require("multer")
const bodyParser = require("body-parser");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });
app.use(upload.single("file"))

// Middlewares: 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
/* app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); */
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use("/", router);

app.listen(5000, () => {
    console.log("El servidor está escuchando en el puerto 5000");
});

