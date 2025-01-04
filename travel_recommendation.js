// Sample data from the API
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

// Show Recommendations based on keyword
document.getElementById('search-button').addEventListener('click', () => {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase().trim();
    const recommendations = travelData[searchQuery];
    
    if (recommendations) {
        const recommendationList = document.getElementById('recommendation-list');
        recommendationList.innerHTML = '';
        
        recommendations.forEach(place => {
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
        alert('No recommendations found for this keyword.');
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
