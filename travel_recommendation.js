// Fetch the travel data from the JSON file (ensure the path is correct)
async function fetchTravelData() {
    try {
        const response = await fetch('travelData.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading travel data:', error);
        return [];
    }
}

// Show recommendations based on keyword
document.getElementById('search-button').addEventListener('click', async () => {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase().trim();
    const travelData = await fetchTravelData();

    // Filter recommendations based on the search query
    const filteredRecommendations = travelData.filter(place => 
        place.name.toLowerCase().includes(searchQuery) || 
        place.description.toLowerCase().includes(searchQuery)
    );

    const recommendationList = document.getElementById('recommendation-list');
    recommendationList.innerHTML = '';  // Clear previous results

    if (filteredRecommendations.length > 0) {
        filteredRecommendations.forEach(place => {
            const recommendationItem = document.createElement('div');
            recommendationItem.classList.add('recommendation-item');

            recommendationItem.innerHTML = `
                <img src="${place.imageUrl}" alt="${place.name}">
                <h3>${place.name}</h3>
                <p>${place.description}</p>
            `;

            recommendationList.appendChild(recommendationItem);
        });
    } else {
        recommendationList.innerHTML = `<p>No recommendations found for this keyword.</p>`;
    }
});

// Clear button functionality
document.getElementById('clear-button').addEventListener('click', () => {
    document.getElementById('recommendation-list').innerHTML = '';
    document.getElementById('search-bar').value = '';
});

// Contact form submit
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    alert(`Thank you, ${name}. We have received your message.`);
});
