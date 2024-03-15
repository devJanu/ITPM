const express = require("express");
const bodyParser = require("body-parser");
const transactionRoutes = require("./FinanceManagement/FinanceRoute");
const bookingRoutes = require("./BookingManagement/BookingRoute");
const paymentRoutes = require("./FinanceManagement/Payment/PaymentRoute");
const db = require("./DB/connection");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

//Finance Management
app.use("/transactions", transactionRoutes);
app.use("/payments", paymentRoutes);

//Bookings
app.use("/bookings", bookingRoutes);

//Service

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
