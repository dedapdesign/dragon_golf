// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM is fully loaded and parsed");

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
    var coursesContainer = document.getElementById('courses-container');
    if (coursesContainer) {
        coursesContainer.parentNode.insertBefore(filterBar, coursesContainer);
        console.log("Filter bar added before #courses-container");
    } else {
        console.error("No element with id 'courses-container' found");
    }
});
