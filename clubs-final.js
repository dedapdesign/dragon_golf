// Function to create and display club cards
function displayClub(club) {
    // Create card element
    var card = document.createElement('div');
    card.className = 'club-card';

    // Create image element
    var image = document.createElement('img');
    image.src = club.featuredImageURL;
    image.className = 'club-image';
    card.appendChild(image);

    // Create name element
    var name = document.createElement('h3');
    name.textContent = club.name;
    card.appendChild(name);

    // Create country name element
    var countryName = document.createElement('p');
    countryName.textContent = club.countryName;
    card.appendChild(countryName);

    // Append card to the clubs container
    var coursesContainer = document.getElementById('courses-container');
    coursesContainer.appendChild(card);

    // Adjust the height of the container dynamically
    adjustContainerHeight(coursesContainer);
}

// CSS styles for club cards
var clubStyles = `
    /* Club container styles */
    #courses-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
        padding: 16px;
    }

    /* Club card styles */
    .club-card {
        background-color: #f8f8f8;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
    }

    .club-card:hover {
        transform: translateY(-4px);
    }

    .club-card img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        margin-bottom: 12px;
        padding: 0; /* Remove padding around the image */
    }

    .club-card h3 {
        margin-top: 16px; /* Add margin only at the top of the name */
        margin-bottom: 8px;
        font-size: 1rem; /* Change name font size to 1rem */
    }

    .club-card p {
        margin-bottom: 16px; /* Add margin only at the bottom of the countryName */
        font-size: 1rem;
        color: #666;
    }
`;

// Create a <style> element and append CSS styles to it
var styleElement = document.createElement('style');
styleElement.textContent = clubStyles;

// Append the <style> element to the document's <head>
document.head.appendChild(styleElement);
