const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")( "sk_test_51P6UpgEaqXayhNaAfAFVOYaDhy2NMUDFaZJUmA7K1W8WESj3P5a5shLZZKPOa9RwB9RzL6xM5YXFF76QbwXMkBRh005NCZVTlU")
// Initialize Express app
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get("/", (req, res) => res.status(200).send("Hello World!"));

app.post("/payments/create", async (req, res) => {
    try {
        const { total } = req.query;
        logger.info("Payment request received", { total });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd"
        });

        // If payment intent created successfully, send client secret to client
        res.status(201).send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        logger.error("Error creating payment intent", error);
        res.status(500).send({ error: "An error occurred while processing payment." });
    }
});

// Listen for incoming HTTP requests
exports.api = functions.https.onRequest(app);
