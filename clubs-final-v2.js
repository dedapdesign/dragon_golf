// Include jQuery directly within the clubs.js file
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.onload = function() {
    // Once jQuery is loaded, execute the rest of the script
    $(document).ready(function() {
        let clubsData = [];

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
                font-family: "Inter", sans-serif;
            }

            .club-card h3 {
                margin: 0;
                font-size: 0.9rem;
                padding-bottom: 3px;
                color: #113074;
                line-height: 1rem;
                font-weight: 600;
            }

            .club-card p {
                margin: 0;
                font-size: 0.8rem;
                color: #113074;
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
                    clubsData = data;
                    displayClubsByCountry('all');
                    updateFilterChips();
                },
                error: function(error) {
                    console.error('Error fetching clubs:', error);
                }
            });
        }

        // Function to create filter chips
        function createFilterChips() {
            var filterChipsContainer = document.createElement('div');
            filterChipsContainer.className = 'filter-chips';
            var countries = ['all', 'Indonesia', 'Vietnam', 'Thailand', 'Cambodia', 'Malaysia', 'Australia', 'Scotland'];
            countries.forEach(function(country) {
                var filterChip = document.createElement('div');
                filterChip.className = 'filter-chip';
                filterChip.textContent = country;
                filterChip.dataset.country = country;
                filterChipsContainer.appendChild(filterChip);
            });
            document.body.insertBefore(filterChipsContainer, document.getElementById('courses-container'));
        }

        // Function to display clubs by country
        function displayClubsByCountry(country) {
            var coursesContainer = document.getElementById('courses-container');
            coursesContainer.innerHTML = '';
            var filteredClubs = country === 'all' ? clubsData : clubsData.filter(club => club.countryName === country);
            filteredClubs.forEach(displayClub);
            adjustContainerHeight(coursesContainer);
        }

        // Function to adjust container height dynamically
        function adjustContainerHeight(container) {
            var cards = container.getElementsByClassName('club-card');
            var numberOfCards = cards.length;
            var cardHeight = cards[0]?.offsetHeight || 300;
            var gap = 16;
            var rows = Math.ceil(numberOfCards / 3);
            var totalHeight = rows * (cardHeight + gap) - gap;
            container.style.height = totalHeight + 'px';
            container.style.setProperty('height', 'auto', 'important');
        }

        // Function to update filter chips text
        function updateFilterChips() {
            const countryCount = clubsData.reduce((acc, club) => {
                acc[club.countryName] = (acc[club.countryName] || 0) + 1;
                return acc;
            }, {});

            $('.filter-chip').each(function() {
                var country = $(this).data('country');
                if (country === 'all') {
                    $(this).text(`All (${clubsData.length})`);
                } else {
                    var count = countryCount[country] || 0;
                    $(this).text(`${country} (${count})`);
                }
            });
        }

        // Event listener for filter chip click
        $(document).on('click', '.filter-chip', function() {
            $('.filter-chip').removeClass('selected');
            $(this).addClass('selected');
            var country = $(this).data('country');
            displayClubsByCountry(country);
        });

        // Fetch clubs on document ready
        fetchClubs();

        // Create filter chips
        createFilterChips();
    });
};
document.head.appendChild(script);
