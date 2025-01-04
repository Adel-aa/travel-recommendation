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

    // Special case for Cairo - display popup
    if (query === "cairo") {
        showCairoModal();
    }

    // Display filtered recommendations
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

// Show the Cairo Trip details in a modal
function showCairoModal() {
    const modal = document.getElementById("cairo-modal");
    modal.style.display = "block";
}

// Close the modal
document.getElementById("close-modal").addEventListener("click", function () {
    const modal = document.getElementById("cairo-modal");
    modal.style.display = "none";
});

// Clear search results
function clearResults() {
    document.getElementById("search-bar").value = "";
    document.getElementById("results").innerHTML = "";
}

// Event listeners for search and clear buttons
document.getElementById("search-btn").addEventListener("click", searchRecommendations);
document.getElementById("reset-btn").addEventListener("click", clearResults);
