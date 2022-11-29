const express = require("express");
const app = express();
const router = require("./routes/routes")
const cookieParser = require('cookie-parser');

// Middlewares: 
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", router);

app.listen(5000, () => {
    console.log("El servidor está escuchando en el puerto 5000");
});

 