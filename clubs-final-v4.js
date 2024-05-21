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

        // Function to create and display filter chips
        function createFilterChips() {
            var filterChipsContainer = document.createElement('div');
            filterChipsContainer.className = 'filter-chips';

            // Define filter chip data
            var filterChipsData = [
                { country: 'all', label: 'All' },
                { country: 'Indonesia', label: 'Indonesia' },
                { country: 'Vietnam', label: 'Vietnam' },
                { country: 'Thailand', label: 'Thailand' },
                { country: 'Cambodia', label: 'Cambodia' },
                { country: 'Malaysia', label: 'Malaysia' },
                { country: 'Australia', label: 'Australia' },
                { country: 'Scotland', label: 'Scotland' }
            ];

            // Create filter chips
            filterChipsData.forEach(function(chipData) {
                var filterChip = document.createElement('div');
                filterChip.className = 'filter-chip';
                filterChip.textContent = chipData.label;
                filterChip.dataset.country = chipData.country;
                filterChipsContainer.appendChild(filterChip);
            });

            // Append filter chips container to the document body
            document.body.appendChild(filterChipsContainer);
        }

        // CSS styles for club cards and filter chips
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

            /* Filter chip styles */
            .filter-chips {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 8px;
                padding: 16px;
            }

            .filter-chip {
                background-color: transparent;
                color: #113074;
                padding: 8px 16px;
                margin: 5px;
                border-radius: 6px;
                cursor: pointer;
                border: 2px solid #113074;
                transition: background-color 0.3s;
            }

            .filter-chip.selected {
                background-color: #113074;
                color: #fff;
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

        // Create filter chips on document ready
        createFilterChips();
    });
};
document.head.appendChild(script);
