const express = require("express");
const path = require("path");
const routes = require("./routes/routes");
//const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.static(path.join(__dirname, "public")));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use((req, res, next) => {
  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
