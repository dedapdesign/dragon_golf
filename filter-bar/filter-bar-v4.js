// Include jQuery directly within the clubs.js file
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.onload = function() {
    // Once jQuery is loaded, execute the rest of the script
    $(document).ready(function() {

        // CSS styles for filter chips
        var filterChipStyles = `
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

        // Create a <style> element and append CSS styles for filter chips to it
        var filterChipStyleElement = document.createElement('style');
        filterChipStyleElement.textContent = filterChipStyles;

        // Append the <style> element to the document's <head>
        document.head.appendChild(filterChipStyleElement);

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

        // Create and append filter bar
        var filterBar = document.createElement('div');
        filterBar.className = 'filter-chips';
        filterBar.innerHTML = `
            <div class="filter-chip selected" data-country="all">All</div>
            <div class="filter-chip" data-country="Indonesia">Indonesia</div>
            <div class="filter-chip" data-country="Vietnam">Vietnam</div>
            <div class="filter-chip" data-country="Thailand">Thailand</div>
            <div class="filter-chip" data-country="Cambodia">Cambodia</div>
            <div class="filter-chip" data-country="Malaysia">Malaysia</div>
            <div class="filter-chip" data-country="Australia">Australia</div>
            <div class="filter-chip" data-country="Scotland">Scotland</div>
        `;
        document.body.insertBefore(filterBar, document.getElementById('courses-container'));

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
                height: 220px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
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
                margin: 0;
                font-size: 1rem;
                color: #113074;
                font-weight: 600;
            }

            .club-card p {
                margin: 0;
                font-size: 0.8rem;
                color: #113074;
            }
        `;

        // Create a <style> element and append CSS styles for club cards to it
        var clubStyleElement = document.createElement('style');
        clubStyleElement.textContent = clubStyles;

        // Append the <style> element to the document's <head>
        document.head.appendChild(clubStyleElement);

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
