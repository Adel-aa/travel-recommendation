// Fetch travel data from JSON file
async function fetchTravelData() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        return await response.json();
    } catch (error) {
        console.error('Error loading travel data:', error);
        return [];
    }
}

// Search recommendations
document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-bar').value.toLowerCase().trim();
    const travelData = await fetchTravelData();

    const recommendations = travelData.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );

    const recommendationList = document.getElementById('recommendation-list');
    recommendationList.innerHTML = '';

    if (recommendations.length > 0) {
        recommendations.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('recommendation-item');
            div.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            `;
            recommendationList.appendChild(div);
        });
    } else {
        recommendationList.innerHTML = '<p>No recommendations found.</p>';
    }
});

// Clear button
document.getElementById('clear-button').addEventListener('click', () => {
    document.getElementById('recommendation-list').innerHTML = '';
    document.getElementById('search-bar').value = '';
});

// Contact form submit
document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    alert(`Thank you, ${name}. Your message has been received!`);
});
