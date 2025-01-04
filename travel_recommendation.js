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
        item.name.toLowerCase().includes(query) || item.type.includes(query)
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

    // If Cairo is searched, show the popup
    if (query === "cairo") {
        showPopup("Cairo Trip", "Explore the wonders of Cairo with its rich culture and historical landmarks.");
    }
}

// Clear search results
function clearResults() {
    document.getElementById("search-bar").value = "";
    document.getElementById("results").innerHTML = "";
}

// Show Popup with trip details
function showPopup(title, description) {
    document.getElementById("popup-title").textContent = title;
    document.getElementById("popup-description").textContent = description;
    document.getElementById("popup-modal").style.display = "flex";
}

// Close Popup
document.getElementById("close-popup").addEventListener("click", () => {
    document.getElementById("popup-modal").style.display = "none";
});

// Event listeners for search and clear buttons
document.getElementById("search-btn").addEventListener("click", searchRecommendations);
document.getElementById("reset-btn").addEventListener("click", clearResults);
