document.addEventListener('DOMContentLoaded', function() {
    // Map functionality
    const metroMapImage = document.getElementById('metroMapImage');
    const mapContainer = document.querySelector('.map-responsive-container');
    const mapLoading = document.querySelector('.map-loading');
    
    // Zoom controls
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const resetZoomBtn = document.getElementById('resetZoom');
    
    // Line filter buttons
    const allLinesBtn = document.getElementById('allLinesBtn');
    const lineButtons = document.querySelectorAll('.control-btn:not(#allLinesBtn)');
    
    // Station search
    const stationSearch = document.getElementById('stationSearch');
    const searchResults = document.getElementById('searchResults');
    
    // Map stations data (simplified for demo)
    const stations = [
        { name: "Rajiv Chowk", x: 50, y: 45, lines: ["Blue Line", "Yellow Line"] },
        { name: "Kashmere Gate", x: 48, y: 30, lines: ["Red Line", "Yellow Line", "Violet Line"] },
        { name: "Central Secretariat", x: 52, y: 55, lines: ["Yellow Line", "Violet Line"] },
        { name: "Mandi House", x: 55, y: 50, lines: ["Blue Line", "Violet Line"] },
        { name: "Hauz Khas", x: 42, y: 70, lines: ["Yellow Line", "Magenta Line"] },
        { name: "Dwarka", x: 20, y: 60, lines: ["Blue Line", "Grey Line"] },
        { name: "Botanical Garden", x: 70, y: 65, lines: ["Blue Line", "Magenta Line"] },
        { name: "Welcome", x: 65, y: 25, lines: ["Red Line", "Pink Line"] }
        // Add more stations as needed
    ];
    
    // Map variables
    let currentZoom = 1;
    let isDragging = false;
    let startPosX, startPosY, startScrollLeft, startScrollTop;
    
    // Show loading spinner until map loads
    metroMapImage.onload = function() {
        mapLoading.style.display = 'none';
    };
    
    metroMapImage.onerror = function() {
        mapLoading.innerHTML = '<p>Failed to load map. Please try again.</p>';
    };
    
    // Zoom functionality
    zoomInBtn.addEventListener('click', function() {
        if (currentZoom < 2.5) {
            currentZoom += 0.2;
            metroMapImage.style.transform = `scale(${currentZoom})`;
        }
    });
    
    zoomOutBtn.addEventListener('click', function() {
        if (currentZoom > 0.6) {
            currentZoom -= 0.2;
            metroMapImage.style.transform = `scale(${currentZoom})`;
        }
    });
    
    resetZoomBtn.addEventListener('click', function() {
        currentZoom = 1;
        metroMapImage.style.transform = 'scale(1)';
        mapContainer.scrollTo(0, 0);
    });
    
    // Map dragging functionality
    mapContainer.addEventListener('mousedown', function(e) {
        isDragging = true;
        mapContainer.classList.add('grabbing');
        startPosX = e.pageX;
        startPosY = e.pageY;
        startScrollLeft = mapContainer.scrollLeft;
        startScrollTop = mapContainer.scrollTop;
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        const dx = e.pageX - startPosX;
        const dy = e.pageY - startPosY;
        mapContainer.scrollLeft = startScrollLeft - dx;
        mapContainer.scrollTop = startScrollTop - dy;
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        mapContainer.classList.remove('grabbing');
    });
    
    // Line filter functionality
    lineButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Reset all buttons
            allLinesBtn.classList.remove('active');
            lineButtons.forEach(btn => btn.classList.remove('active'));
            
            // Activate current button
            this.classList.add('active');
            
            const lineName = this.textContent.trim();
            console.log(`Filtered to show: ${lineName}`);
            
            // Change the map image based on line selection
            if (lineName.includes('Blue Line')) {
                metroMapImage.src = 'images/Metro map.jpg';
            } else if (lineName.includes('Yellow Line')) {
                metroMapImage.src = 'images/Metro map.jpg';
            } else if (lineName.includes('Red Line')) {
                metroMapImage.src = 'images/Metro map.jpg';
            } else if (lineName.includes('Green Line')) {
                metroMapImage.src = 'images/Metro map.jpg';
            } else if (lineName.includes('Violet Line')) {
                metroMapImage.src = 'images/Metro map.jpg';
            } else {
                // For other lines where we don't have specific images yet,
                // we'll just use the full map for now
                metroMapImage.src = 'images/Metro map.jpg';
            }
        });
    });
    
    allLinesBtn.addEventListener('click', function() {
        // Show all lines
        lineButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Reset to full map
        metroMapImage.src = 'images/Metro map.jpg';
        console.log('Showing all lines');
    });
    
    // Station search functionality
    stationSearch.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        searchResults.innerHTML = '';
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        const matches = stations.filter(station => 
            station.name.toLowerCase().includes(query)
        );
        
        if (matches.length > 0) {
            searchResults.style.display = 'block';
            matches.forEach(station => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.textContent = station.name;
                
                // Create line indicators
                const lineIndicators = document.createElement('div');
                lineIndicators.className = 'line-indicators';
                
                station.lines.forEach(line => {
                    const lineClass = line.toLowerCase().replace(' ', '-') + '-indicator';
                    const indicator = document.createElement('span');
                    indicator.className = lineClass;
                    lineIndicators.appendChild(indicator);
                });
                
                resultItem.appendChild(lineIndicators);
                
                resultItem.addEventListener('click', function() {
                    // This would highlight the station on the map
                    // In a real implementation, you could scroll to the station's position
                    console.log(`Selected station: ${station.name}`);
                    stationSearch.value = station.name;
                    searchResults.style.display = 'none';
                    
                    // Example: Create a highlight effect at station position
                    highlightStation(station);
                });
                
                searchResults.appendChild(resultItem);
            });
        } else {
            searchResults.style.display = 'block';
            searchResults.innerHTML = '<div class="no-results">No stations found</div>';
        }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchResults.contains(e.target) && e.target !== stationSearch) {
            searchResults.style.display = 'none';
        }
    });
    
    function highlightStation(station) {
        // Remove any existing highlights
        const existingHighlights = document.querySelectorAll('.station-highlight');
        existingHighlights.forEach(el => el.remove());
        
        // Create a highlight element
        const highlight = document.createElement('div');
        highlight.className = 'station-highlight';
        highlight.style.left = `${station.x}%`;
        highlight.style.top = `${station.y}%`;
        
        mapContainer.appendChild(highlight);
        
        // Set a timeout to auto-remove the highlight
        setTimeout(() => {
            highlight.classList.add('fade-out');
            setTimeout(() => highlight.remove(), 500);
        }, 3000);
    }
}); 