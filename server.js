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


//Route to handle AJAX requests from the front-end
app.post("/api/pokemon", async (req, res) => {
    //Extract the 3 parameters sent from the front-end
    const pokemonName = req.body.pokemonName;
    const includeSpecies = req.body.includeSpecies;
    const includeLocation = req.body.includeLocation;

    console.log(`Backend received request for Pokemon: ${pokemonName}`);
    console.log(`Include Species: ${includeSpecies}, Include Location: ${includeLocation}`);

    //Echoing data for testing purposes
    res.json({
        status: "success",
        message: `Backend successfully received your request to search for ${pokemonName}!`,
        paramsReceived: {
            name: pokemonName,
            species: includeSpecies,
            location: includeLocation
        }
    });
});