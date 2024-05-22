// Include jQuery directly within the script
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.onload = function() {
    $(document).ready(function() {
        console.log("DOM is fully loaded and parsed");
        let clubsData = [];

        // Function to create and display club cards
        function displayClub(club) {
            var card = document.createElement('div');
            card.className = 'club-card';

            var image = document.createElement('img');
            image.src = club.featuredImageURL;
            image.className = 'club-image';
            card.appendChild(image);

            var content = document.createElement('div');
            content.className = 'club-content';

            var name = document.createElement('h3');
            name.textContent = club.name;
            content.appendChild(name);

            var countryName = document.createElement('p');
            countryName.textContent = club.countryName;
            content.appendChild(countryName);

            card.appendChild(content);
            document.getElementById('courses-container').appendChild(card);
        }

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

        function fetchClubs() {
            $.ajax({
                url: 'https://asia-southeast1-dragon-golf-international.cloudfunctions.net/getCourses',
                method: 'GET',
                success: function(data) {
                    clubsData = data;
                    console.log("Clubs data fetched successfully");

                    // Create filter chips dynamically based on countries
                    createFilterChips(clubsData);

                    displayClubsByCountry('all');
                },
                error: function(error) {
                    console.error('Error fetching clubs:', error);
                }
            });
        }

        // Function to create filter chips based on countries in data
        function createFilterChips(data) {
            var filterBar = document.createElement('div');
            filterBar.className = 'filter-chips';

            // Add 'All' filter chip
            var allChip = document.createElement('div');
            allChip.className = 'filter-chip selected';
            allChip.dataset.country = 'all';
            allChip.textContent = 'All';
            filterBar.appendChild(allChip);

            // Create chips for unique countries
            var uniqueCountries = new Set();
            data.forEach(club => uniqueCountries.add(club.countryName));
            uniqueCountries.forEach(country => {
                var chip = document.createElement('div');
                chip.className = 'filter-chip';
                chip.dataset.country = country;
                chip.textContent = country;
                filterBar.appendChild(chip);
            });

            // Append the filterBar to the filter-bar div
            $('#filter-bar').append(filterBar);

            // Add event listener to filter chips
            $('.filter-chips').on('click', '.filter-chip', function() {
                var country = $(this).data('country'); // Get the country from the clicked chip
                $('.filter-chip').removeClass('selected');
                $(this).addClass('selected');
                displayClubsByCountry(country);
            });
        }

        function displayClubsByCountry(country) {
            var coursesContainer = document.getElementById('courses-container');
            coursesContainer.innerHTML = ''; // Clear the container
            var filteredClubs = country === 'all' ? clubsData : clubsData.filter(club => club.countryName === country);
            filteredClubs.forEach(displayClub); // Display the filtered clubs
            adjustContainerHeight(coursesContainer);
        }

        // Add CSS styles
        function addCSSStyles() {
            var styles = `
                /* Filter chip styles */
                .filter-chips {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 4px;
                    padding: 16px;
                }

                .filter-chip {
                    background-color: transparent;
                    color: #113074;
                    padding: 8px 16px;
                    margin: 2px;
                    border-radius: 6px;
                    cursor: pointer;
                    border: 2px solid #113074;
                    transition: background-color 0.3s;
                }

                .filter-chip.selected {
                    background-color: #113074;
                    color: #fff;
                }

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
            var styleSheet = document.createElement("style");
            styleSheet.type = "text/css";
            styleSheet.innerText = styles;
            document.head.appendChild(styleSheet);
        }

        addCSSStyles();
        fetchClubs();
    });
};
document.head.appendChild(script);
