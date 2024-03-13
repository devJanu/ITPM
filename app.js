const express = require("express");
const bodyParser = require("body-parser");
const transactionRoutes = require("./FinanceManagement/FinanceRoute");
const db = require("./DB/connection");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use("/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
