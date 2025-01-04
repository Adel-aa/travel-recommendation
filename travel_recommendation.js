// Fetch and filter data
async function fetchRecommendations() {
    try {
        const response = await fetch("travel_recommendation_api.json");
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Display search results
async function searchRecommendations() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const results = document.getElementById("results");
    results.innerHTML = ""; // Clear existing results

    const data = await fetchRecommendations();

    const filtered = data.filter(item =>
        item.name.toLowerCase().includes(query) || item.type.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        results.innerHTML = "<p>No results found for your search.</p>";
    }

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
