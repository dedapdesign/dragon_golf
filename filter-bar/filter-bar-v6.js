document.addEventListener("DOMContentLoaded", function() {
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
    
    // Function to insert filter bar before courses-container
    function insertFilterBar() {
        var coursesContainer = document.getElementById('courses-container');
        if (coursesContainer) {
            document.body.insertBefore(filterBar, coursesContainer);
        } else {
            console.error("#courses-container not found. Retrying in 100ms.");
            setTimeout(insertFilterBar, 100);
        }
    }
    
    // Call the function to insert filter bar
    insertFilterBar();
});
