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
    try {
        const pokemonName = req.body.pokemonName;
        const includeSpecies = req.body.includeSpecies;
        const includeLocation = req.body.includeLocation;

        console.log(`Fetching data for: ${pokemonName}`);

        //Fetch the base Pokemon data
        const baseResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        //Sends data from front end
        let pokemonData = {
            name: baseResponse.data.name,
            id: baseResponse.data.id,
            height: baseResponse.data.height,
            weight: baseResponse.data.weight,
            sprite: baseResponse.data.sprites.front_default
        };

        //Conditionally fetch Species data if requested
        if (includeSpecies) {
            const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
            //Find the first English Pokedex entry
            const entry = speciesResponse.data.flavor_text_entries.find(e => e.language.name === "en");
            
            pokemonData.description = entry ? entry.flavor_text : "No description available.";
        }

        //Conditionally fetch Location data if requested
        if (includeLocation) {
            const locationResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/encounters`);
            
            if (locationResponse.data.length > 0) {
                //Grab the first 3 locations
                pokemonData.locations = locationResponse.data.slice(0, 3).map(loc => loc.location_area.name.replace(/-/g, ' '));
            } else {
                pokemonData.locations = ["Cannot be caught in the wild."];
            }
        }


        //Send it back to the client
        res.json({ status: "success", data: pokemonData });

    } catch (error) {
        console.error("API Error:", error.message);
        //If PokeAPI returns a 404 Pokemon doesn't exist
        res.status(404).json({ status: "error", message: "Pokemon not found! Check your spelling." });
    }
});