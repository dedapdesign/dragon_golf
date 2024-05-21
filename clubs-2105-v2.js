// Dynamically create a link element for CSS and append it to the head
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://cdn.jsdelivr.net/gh/dedapdesign/dragon_golf/styles.css'; // Replace 'styles.css' with the path to your CSS file
document.head.appendChild(link);

// Include jQuery directly within the clubs.js file
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.onload = function() {
    // Once jQuery is loaded, execute the rest of the script
    $(document).ready(function() {
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

        $('.filter-chip').click(function() {
            $('.filter-chip').removeClass('selected');
            $(this).addClass('selected');
            var country = $(this).data('country');
            displayClubsByCountry(country);
        });

        fetchClubs();
    });
};
document.head.appendChild(script);
