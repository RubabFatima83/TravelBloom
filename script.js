let recommendationsData = {};

// FETCH JSON DATA
fetch("recommendations.json")
    .then(response => response.json())
    .then(data => {
        recommendationsData = data;
        showAllRecommendations(); // page load pe sab dikhao
    })
    .catch(error => {
        console.error("Error loading recommendations:", error);
    });


// DISPLAY ALL CATEGORIES
function showAllRecommendations() {
    const container = document.getElementById("recommendations");
    container.innerHTML = "";

    for (let category in recommendationsData) {
        createCategoryCards(category, recommendationsData[category]);
    }
}


// CREATE CARDS FOR A CATEGORY
function createCategoryCards(category, items) {
    const container = document.getElementById("recommendations");

    const section = document.createElement("div");
    section.classList.add("card");

    section.innerHTML = `<h3>${capitalize(category)} Recommendations</h3>`;

    items.forEach(item => {
        const cardItem = document.createElement("div");
        cardItem.classList.add("place-card");

        cardItem.innerHTML = `
    <div class="card-image">
        <img src="${item.imageUrl}" alt="${item.name}">
    </div>

    <div class="card-content">
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <button class="visit-btn">Visit</button>
    </div>
`;
        section.appendChild(cardItem);
    });

    container.appendChild(section);
}


// SEARCH FUNCTION (JSON BASED)
function searchDestination() {
    const value = document.getElementById("searchInput").value.toLowerCase().trim();
    const container = document.getElementById("recommendations");

    container.innerHTML = "";

    if (recommendationsData[value]) {
        createCategoryCards(value, recommendationsData[value]);
    } else {
        alert("Please enter: beach, temple, or country");
        showAllRecommendations();
    }
}


// CLEAR BUTTON FUNCTION
function clearResults() {
    document.getElementById("searchInput").value = "";
    showAllRecommendations();
}


// HELPER FUNCTION
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}


// Optional: Contact form submission (simulated)
function submitForm(event) {
    event.preventDefault();
    alert("Thank you! Your message has been submitted.");
}