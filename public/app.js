document.getElementById('pokeForm').addEventListener('submit', async function(event) {
    //Prevent the form from refreshing the page
    event.preventDefault();

    //Get the values from the form elements
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase().trim();
    const includeSpecies = document.getElementById('includeSpecies').checked;
    const includeLocation = document.getElementById('includeLocation').checked;

    //Create the data object to send to our backend as JSON
    const requestData = {
        pokemonName: pokemonName,
        includeSpecies: includeSpecies,
        includeLocation: includeLocation
    };

    //Log to console to verify we are capturing the inputs correctly
    console.log("Data ready to send to backend:", requestData);

  
});