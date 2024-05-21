// Include jQuery directly within the script
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.onload = function() {
    // Once jQuery is loaded, execute the rest of the script
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
                    displayClubsByCountry('all');
                    updateFilterChips();
                },
                error: function(error) {
                    console.error('Error fetching clubs:', error);
                }
            });
        }

        function displayClubsByCountry(country) {
            var coursesContainer = document.getElementById('courses-container');
            coursesContainer.innerHTML = '';
            var filteredClubs = country === 'all' ? clubsData : clubsData.filter(club => club.countryName === country);
            filteredClubs.forEach(displayClub);
            adjustContainerHeight(coursesContainer);
        }

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

        // Create and append filter bar
        function createAndAppendFilterBar() {
            console.log("Creating and appending filter bar");
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
            var coursesContainer = document.getElementById('courses-container');
            if (coursesContainer) {
                document.body.insertBefore(filterBar, coursesContainer);
                console.log("Filter bar added to DOM");
            } else {
                console.error("courses-container not found in the DOM");
            }
        }

        // Add event listener to filter chips
        function addFilterChipEventListener() {
            document.querySelector('.filter-chips').addEventListener('click', function(event) {
                var target = event.target;
                if (target.classList.contains('filter-chip')) {
                    var country = target.dataset.country;
                    $('.filter-chip').removeClass('selected');
                    $(target).addClass('selected');
                    displayClubsByCountry(country);
                }
            });
        }

        // Add CSS styles
        function addCSSStyles() {
            var styles = `
                /* Body background */
                body {
                    background: linear-gradient(217deg, #FFE37F -29.825282244422084%, #D6A800 100%);
                    font-family: "Inter", sans-serif;
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
        createAndAppendFilterBar();
        addFilterChipEventListener();
        fetchClubs();
    });
};
document.head.appendChild(script);
