const express = require("express");
const bodyParser = require("body-parser");
const transactionRoutes = require("./FinanceManagement/FinanceRoute");
const bookingRoutes = require("./BookingManagement/BookingRoute");
const paymentRoutes = require("./FinanceManagement/Payment/PaymentRoute");
const transportRoutes = require("./ServiceManagement/Transport/TransportRoute");
const photographsRoutes = require("./ServiceManagement/Photography/PhotographyRoute");

const db = require("./DB/connection");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

//Finance Management
app.use("/transactions", transactionRoutes);
app.use("/payments", paymentRoutes);

//Booking Management
app.use("/bookings", bookingRoutes);

//Service Management
app.use("/transports", transportRoutes);
// app.use("/beautician", transportRoutes);
app.use("/photography", photographsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
