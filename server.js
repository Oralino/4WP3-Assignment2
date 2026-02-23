const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

//Middleware to parse JSON bodies from AJAX requests
app.use(express.json());

//Serve static front-end files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

//Route to serve the main front-end page at /app
app.get("/app", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});