# Pokédex

McMaster University **4WP3** (Web Programming) assignment. A small Express app that looks up any
Pokémon through [PokéAPI](https://pokeapi.co/).

<p>
  <img src="docs/search-result.png" alt="Charizard result with sprite, height, weight, Pokédex entry and encounter locations" width="330">
  <img src="docs/not-found.png" alt="Error message for an unknown Pokémon" width="330">
</p>

## Features

- The front end sends the search to an Express route with `fetch`; the server calls PokéAPI with axios
- Shows the Pokémon's sprite, number, height and weight
- Optional: the first English Pokédex entry (species endpoint)
- Optional: up to three wild encounter locations
- Clear error message when a Pokémon doesn't exist

## Tech

Node.js, Express, axios, HTML/CSS/JavaScript

## Run

```bash
npm install
node server.js
```

Then open http://localhost:3000/app.
