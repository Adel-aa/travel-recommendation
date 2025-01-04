// Sample data from the API (Initial static data, for testing purpose)
const travelData = {
    beach: [
        {
            name: "Bondi Beach",
            imageUrl: "https://via.placeholder.com/400x300",
            description: "A famous beach in Sydney, Australia."
        },
        {
            name: "Waikiki Beach",
            imageUrl: "https://via.placeholder.com/400x300",
            description: "A popular beach in Honolulu, Hawaii."
        }
    ],
    temple: [
        {
            name: "Angkor Wat",
            imageUrl: "https://via.placeholder.com/400x300",
            description: "A historical temple in Cambodia."
        },
        {
            name: "Golden Temple",
            imageUrl: "https://via.placeholder.com/400x300",
            description: "A stunning religious site in India."
        }
    ],
    country: [
        {
            name: "USA",
            imageUrl: "https://via.placeholder.com/400x300",
            description: "A country known for its diverse landscapes and culture."
        },
        {
            name: "Japan",
            imageUrl: "https://via.placeholder.com/400x300",
            description: "A country known for its technology and tradition."
        }
    ]
};

// Fetch the travel data from the JSON file (used for external data)
async function fetchTravelData() {
    try {
        const response = await fetch('travelData.json'); // Replace with correct path to your JSON file
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading travel data:', error);
        return {};
    }
}

// Show Recommendations based on keyword
document.getElementById('search-button').addEventListener('click', async () => {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase().trim();
    const travelData = await fetchTravelData();
    
    // Filter recommendations based on the search query
    const filteredRecommendations = Object.values(travelData).flat().filter(place => 
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

// Sample button functionality
document.getElementById('sample-button').addEventListener('click', () => {
    console.log("Sample button clicked!");
    // You can add more actions here
});

// Event listener for search input
document.getElementById('search-bar').addEventListener('input', () => {
    console.log("Searching for: " + document.getElementById('search-bar').value);
    // You can implement real-time search here if needed
});

// More custom code could go here based on requirements
