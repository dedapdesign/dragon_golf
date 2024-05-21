// Include jQuery directly within the clubs.js file
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.onload = function() {
    // Once jQuery is loaded, execute the rest of the script
 $(document).ready(function() {
    let clubsData = [];

    // CSS styles
    var styles = `
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

    // Create a <style> element and append CSS styles to it
    var styleElement = document.createElement('style');
    styleElement.textContent = styles;

    // Append the <style> element to the document's <head>
    document.head.appendChild(styleElement);

    // Function to create and display club cards
    function displayClub(club) {
        // Create card element
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

        // Clear existing filter chips
        document.querySelector('.filter-chips').innerHTML = '';

        // Create filter chips for each country
        for (const country in countryCount) {
            createFilterChip(country, countryCount[country]);
        }
    }

    // Function to create and display filter chips
    function createFilterChip(country, count) {
        var chip = document.createElement('div');
        chip.className = 'filter-chip';
        chip.setAttribute('data-country', country);
        chip.textContent = country;
        document.querySelector('.filter-chips').appendChild(chip);
    }

    // Event listener for filter chips
    document.querySelector('.filter-chips').addEventListener('click', function(event) {
        if (event.target.classList.contains('filter-chip')) {
            var country = event.target.dataset.country;
            displayClubsByCountry(country);
            updateSelectedFilterChip(event.target);
        }
    });

    // Function to update the selected filter chip
    function updateSelectedFilterChip(selectedChip) {
        var chips = document.querySelectorAll('.filter-chip');
        chips.forEach(chip => {
            chip.classList.remove('selected');
        });
        selectedChip.classList.add('selected');
    }

    fetchClubs();
});
