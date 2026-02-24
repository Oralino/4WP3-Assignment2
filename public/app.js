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
        const response = await fetch('/api/pokemon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        
        //Handle 404 Not Found errors
        if (data.status === "error") {
            resultsDiv.innerHTML = `<p style="color:red; font-weight:bold; text-align:center;">${data.message}</p>`;
            resultsDiv.classList.remove('hidden');
            return;
        }

        const pData = data.data; //Extract the pokemonData

        //HTML layout dynamically
        let htmlContent = `
            <h2 style="text-align: center; text-transform: capitalize;">${pData.name} (#${pData.id})</h2>
            <img src="${pData.sprite}" alt="${pData.name} sprite" style="width: 150px; height: 150px; display: block; margin: 0 auto;">
            <table>
                <tbody>
                    <tr>
                        <th style="width: 30%;">Height</th>
                        <td>${pData.height / 10} m</td>
                    </tr>
                    <tr>
                        <th>Weight</th>
                        <td>${pData.weight / 10} kg</td>
                    </tr>
        `;

        //Conditionally add the description row if the user requested it
        if (pData.description) {
            htmlContent += `
                    <tr>
                        <th>Pokedex Entry</th>
                        <td>${pData.description}</td>
                    </tr>
            `;
        }

        //Conditionally add the locations row if the user requested it
        if (pData.locations) {
            const locationsHtml = pData.locations.join('<br>');
            htmlContent += `
                    <tr>
                        <th>Encounter Locations</th>
                        <td style="text-transform: capitalize;">${locationsHtml}</td>
                    </tr>
            `;
        }

        htmlContent += `
                </tbody>
            </table>
        `;

        //Inject the HTML into the page
        resultsDiv.innerHTML = htmlContent;
        resultsDiv.classList.remove('hidden');

    } catch (error) {
        console.error("AJAX error:", error);
        resultsDiv.innerHTML = `<p style="color:red; font-weight:bold; text-align:center;">Error communicating with server.</p>`;
        resultsDiv.classList.remove('hidden');
    } finally {
        loadingIndicator.classList.add('hidden');
    }
});