// Include jQuery directly within the script
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.onload = function() {
    // Once jQuery is loaded, execute the rest of the script
    $(document).ready(function() {
        console.log("DOM is fully loaded and parsed");

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
            document.body.appendChild(filterBar);
            console.log("Filter bar added to DOM");
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
            `;
            var styleSheet = document.createElement("style");
            styleSheet.type = "text/css";
            styleSheet.innerText = styles;
            document.head.appendChild(styleSheet);
        }

        addCSSStyles();
        createAndAppendFilterBar();
    });
};
document.head.appendChild(script);
