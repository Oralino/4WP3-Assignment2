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

    //Log data for verification
    console.log("Data ready to send to backend:", requestData);

    const loadingIndicator = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');

    //Show loading state and hide old results
    loadingIndicator.classList.remove('hidden');
    resultsDiv.classList.add('hidden');
    resultsDiv.innerHTML = ""; 

    try {
        //Send data as JSON in the body
        const response = await fetch('/api/pokemon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`Server returned status ${response.status}`);
        }

        //Receive JSON response from the backend
        const data = await response.json();
        console.log("Received from server:", data);

        //Temporarily dump the JSON for testing
        resultsDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        resultsDiv.classList.remove('hidden');

    } catch (error) {
        console.error("AJAX error:", error);
        resultsDiv.innerHTML = `<p style="color:red; font-weight:bold;">Error communicating with server.</p>`;
        resultsDiv.classList.remove('hidden');
    } finally {
        loadingIndicator.classList.add('hidden');
    }
});