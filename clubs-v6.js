// Include jQuery directly within the clubs.js file
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.onload = function() {
    // Once jQuery is loaded, execute the rest of the script
    $(document).ready(function() {

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

            // Create content container
            var content = document.createElement('div');
            content.className = 'club-content';

            // Create name element
            var name = document.createElement('h3');
            name.textContent = club.name;
            content.appendChild(name);

            // Create country name element
            var countryName = document.createElement('p');
            countryName.textContent = club.countryName;
            content.appendChild(countryName);

            // Append content container to the card
            card.appendChild(content);

            // Append card to the clubs container
            var coursesContainer = document.getElementById('courses-container');
            coursesContainer.appendChild(card);

            // Adjust the height of the container dynamically
            adjustContainerHeight(coursesContainer);
        }

        // Function to adjust the height of the container based on the number of cards
        function adjustContainerHeight(container) {
            var cards = container.getElementsByClassName('club-card');
            var numberOfCards = cards.length;
            var cardHeight = cards[0]?.offsetHeight || 300; // Estimated height of each card in pixels
            var gap = 16; // Gap between cards in pixels

            // Calculate total height
            var rows = Math.ceil(numberOfCards / 3); // Assuming 3 cards per row
            var totalHeight = rows * (cardHeight + gap) - gap;

            // Set the container height
            container.style.height = totalHeight + 'px';

            // Ensure that the height set by Framer is overridden
            container.style.setProperty('height', 'auto', 'important');
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
                border-radius: 8px;
                transition: transform 0.2s;
                height: 250px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }

            .club-card:hover {
                transform: translateY(-4px);
            }

            .club-card img {
                width: 100%;
                height: 150px;
                object-fit: cover;
                border-radius: 8px;
            }

            .club-content {
                padding: 8px;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
            }

            .club-card h3 {
                margin: 0;
                font-size: 1rem;
                padding-bottom: 8px;
            }

            .club-card p {
                margin: 0;
                font-size: 1rem;
                color: #666;
            }
        `;

        // Create a <style> element and append CSS styles to it
        var styleElement = document.createElement('style');
        styleElement.textContent = clubStyles;

        // Append the <style> element to the document's <head>
        document.head.appendChild(styleElement);

        // Function to fetch clubs from Firestore using a Cloud Function
        function fetchClubs() {
            $.ajax({
                url: 'https://asia-southeast1-dragon-golf-international.cloudfunctions.net/getCourses',
                method: 'GET',
                success: function(data) {
                    data.forEach(club => {
                        displayClub(club);
                    });
                },
                error: function(error) {
                    console.error('Error fetching clubs:', error);
                }
            });
        }

        // Fetch clubs on document ready
        fetchClubs();
    });
};
document.head.appendChild(script);
