// Fetch and filter data
async function fetchRecommendations() {
    try {
        const response = await fetch("travel_recommendation_api.json");
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Display recommendations
async function loadRecommendations() {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Clear any previous content

    // Fetch recommendations data
    const data = await fetchRecommendations();

    // Sample: Show the first two recommendations
    const recommendationsToShow = data.slice(0, 2);

    recommendationsToShow.forEach(item => {
        const recommendationHTML = `
            <div class="recommendation-item">
                <img src="${item.imageUrl}" alt="${item.name}" class="recommendation-image">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
        `;
        resultsContainer.innerHTML += recommendationHTML;
    });
}

// Search function for filtering recommendations
async function searchRecommendations() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const results = document.getElementById("results");
    results.innerHTML = ""; // Clear existing results

    const data = await fetchRecommendations();

    const filtered = data.filter(item =>
        item.name.toLowerCase().includes(query) || item.type.toLowerCase().includes(query)
    );

    filtered.forEach(item => {
        const resultCard = `
        <div class="result-card">
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        </div>
        `;
        results.innerHTML += resultCard;
    });
}

// Clear search results
function clearResults() {
    document.getElementById("search-bar").value = "";
    document.getElementById("results").innerHTML = "";
}

// Event listeners for search and clear buttons
document.getElementById("search-btn").addEventListener("click", searchRecommendations);
document.getElementById("reset-btn").addEventListener("click", clearResults);

// Event listener for "Explore Recommendations" button
document.getElementById("explore-btn").addEventListener("click", loadRecommendations);
