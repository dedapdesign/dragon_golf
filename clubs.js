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

            // Create name element
            var name = document.createElement('h3');
            name.textContent = club.name;
            card.appendChild(name);

            // Create country name element
            var countryName = document.createElement('p');
            countryName.textContent = club.countryName;
            card.appendChild(countryName);

            // Append card to the clubs container
            var clubsContainer = document.getElementById('courses-container');
            clubsContainer.appendChild(card);
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
                padding: 16px;
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
            }

            .club-card h3 {
                margin-top: 0;
                margin-bottom: 8px;
                font-size: 1.25rem;
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
                url: 'https://asia-southeast1-dragon-golf-international.cloudfunctions.net/getCourses', // Update with your Cloud Function URL
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
