document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log("Results page loaded");
        
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const source = decodeURIComponent(urlParams.get('source') || "");
        const destination = decodeURIComponent(urlParams.get('destination') || "");
        
        console.log("Source:", source, "Destination:", destination);

        if (!source || !destination) {
            document.getElementById('routeMap').innerHTML = '<p class="error-message">Missing source or destination parameters.</p>';
            return;
        }

        // Update station names in the UI
        document.getElementById('sourceStation').textContent = source;
        document.getElementById('destinationStation').textContent = destination;
        document.getElementById('journeyTitle').innerHTML = `
            <span id="sourceStation">${source}</span> → <span id="destinationStation">${destination}</span>
        `;

        // Find the shortest path
        const result = metro.findShortestPath(source, destination);
        console.log("Path result:", result);

        if (result && result.path && result.path.length > 0) {
            const { path, totalDistance } = result;
            console.log("Path found:", path);
            console.log("Total stations:", path.length - 1);
            
            // Calculate fare
            const fare = metro.calculateFare(totalDistance);
            console.log("Fare:", fare);
            
            // Estimate journey time (approx 2 minutes per station)
            const estimatedMinutes = (path.length - 1) * 2 + 10; // Add 10 minutes buffer
            
            // Calculate random start time
            const now = new Date();
            const startHour = (now.getHours() < 10 ? '0' : '') + now.getHours();
            const startMin = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
            const startAMPM = now.getHours() >= 12 ? 'PM' : 'AM';
            const startTime = `${startHour}:${startMin} ${startAMPM}`;
            
            // Calculate end time
            const endTime = calculateEndTime(now, estimatedMinutes);
            
            // Update times and duration
            document.getElementById('journeyStartTime').textContent = startTime;
            document.getElementById('journeyEndTime').textContent = endTime;
            document.getElementById('journeyDuration').textContent = estimatedMinutes;

            // Update total stations
            document.getElementById('totalStations').textContent = path.length - 1;

            // Update total fare
            document.getElementById('totalFare').textContent = fare;

            // Create route map
            const routeMap = document.getElementById('routeMap');
            routeMap.innerHTML = '';

            // Create the route display
            createDetailedRouteDisplay(path, routeMap);
        } else {
            // Handle no route found
            document.getElementById('routeMap').innerHTML = '<p class="error-message">No route found between the selected stations.</p>';
        }
    } catch (error) {
        console.error("Error in results.js:", error);
        document.getElementById('routeMap').innerHTML = `<p class="error-message">An error occurred: ${error.message}</p>`;
    }
});

function calculateEndTime(startDate, addMinutes) {
    const endDate = new Date(startDate.getTime() + addMinutes * 60000);
    const endHour = (endDate.getHours() < 10 ? '0' : '') + endDate.getHours();
    const endMin = (endDate.getMinutes() < 10 ? '0' : '') + endDate.getMinutes();
    const endAMPM = endDate.getHours() >= 12 ? 'PM' : 'AM';
    return `${endHour}:${endMin} ${endAMPM}`;
}

function createDetailedRouteDisplay(path, container) {
    console.log("Creating route display with path:", path);
    
    // Track the current line for line changes
    let currentLine = null;
    let lineColors = {}; // Store the line colors we've seen
    
    path.forEach((station, index) => {
        // Extract station name and line
        let stationName, line;
        if (typeof station === 'object' && station.station) {
            stationName = station.station;
            line = station.line || "";
            console.log(`Station ${index}:`, stationName, "Line:", line);
        } else {
            stationName = String(station);
            line = "";
            console.log(`Station ${index} (string):`, stationName);
        }
        
        const lineName = line || "default";
        
        // Determine line color
        const lineColor = getLineColor(line);
        lineColors[lineName] = lineColor;
        
        // Create station element
        const stationElement = document.createElement('div');
        stationElement.className = 'station-line';
        
        // Create line color element
        const lineColorElem = document.createElement('div');
        lineColorElem.className = 'line-color';
        lineColorElem.style.color = lineColor;
        
        // Create station dot
        const stationDot = document.createElement('div');
        
        // Large dot for start, end, or interchange stations
        if (index === 0 || index === path.length - 1 || (currentLine && line && line !== currentLine)) {
            stationDot.className = 'station-large-dot';
            stationDot.style.borderColor = lineColor;
        } else {
            stationDot.className = 'station-dot';
            stationDot.style.backgroundColor = lineColor;
        }
        
        lineColorElem.appendChild(stationDot);
        stationElement.appendChild(lineColorElem);
        
        // Create station details
        const stationDetails = document.createElement('div');
        stationDetails.className = 'station-details';
        
        const stationNameElem = document.createElement('span');
        stationNameElem.className = 'station-name';
        stationNameElem.textContent = capitalizeWords(stationName);
        stationDetails.appendChild(stationNameElem);
        
        // Add station info (time, platform)
        const stationInfo = document.createElement('div');
        stationInfo.className = 'station-info';
        
        // Only add timing for stations between first and last
        if (index > 0 && index < path.length - 1) {
            stationInfo.innerHTML = `<i class="far fa-clock"></i>${Math.floor(Math.random() * 6) + 3} Mins`;
            stationDetails.appendChild(stationInfo);
        } else if (index === 0) {
            stationInfo.innerHTML = `<i class="far fa-clock"></i>Start`;
            stationDetails.appendChild(stationInfo);
        }
        
        // Add platform info for random stations
        if (Math.random() > 0.5) {
            const platformElem = document.createElement('div');
            platformElem.className = 'station-info';
            platformElem.innerHTML = `<i class="fas fa-sign"></i>Platform No. ${Math.floor(Math.random() * 4) + 1}`;
            stationDetails.appendChild(platformElem);
        }
        
        // Add direction info (for the first station of each line)
        if (index === 0 || (currentLine && line && line !== currentLine)) {
            const directionElem = document.createElement('div');
            directionElem.className = 'station-direction';
            directionElem.textContent = `Towards ${generateRandomEndStation(line)}`;
            stationElement.appendChild(directionElem);
        }
        
        stationElement.appendChild(stationDetails);
        container.appendChild(stationElement);
        
        // Add interchange point if line changes
        if (currentLine && line && line !== currentLine) {
            addInterchangePoint(container, stationName, currentLine, line);
        }
        
        // Update current line
        if (line) {
            currentLine = line;
        }
    });
}

function addInterchangePoint(container, stationName, fromLine, toLine) {
    const changePoint = document.createElement('div');
    changePoint.className = 'change-point';
    
    const changeInstruction = document.createElement('div');
    changeInstruction.className = 'change-instruction';
    changeInstruction.innerHTML = `
        <div class="change-icon">↻</div>
        <div>Change here</div>
    `;
    
    const changeDetail = document.createElement('div');
    changeDetail.className = 'change-detail';
    
    const fromLineBadgeClass = getLineBadgeClass(fromLine);
    const toLineBadgeClass = getLineBadgeClass(toLine);
    
    changeDetail.innerHTML = `Move Towards <span class="line-badge ${toLineBadgeClass}">${capitalizeWords(toLine)}</span>`;
    
    const changeTiming = document.createElement('div');
    changeTiming.className = 'station-info';
    changeTiming.style.justifyContent = 'flex-end';
    changeTiming.innerHTML = `<i class="fas fa-walking"></i>${Math.floor(Math.random() * 8) + 3} Mins`;
    
    changePoint.appendChild(changeInstruction);
    changePoint.appendChild(changeDetail);
    changePoint.appendChild(changeTiming);
    
    container.appendChild(changePoint);
}

function capitalizeWords(str) {
    if (!str) return "";
    return String(str).replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function getLineBadgeClass(line) {
    if (!line) return "blue-line";
    
    const lineClasses = {
        "blue line": "blue-line",
        "yellow line": "yellow-line",
        "red line": "red-line",
        "green line": "green-line",
        "violet line": "violet-line",
        "pink line": "pink-line",
        "magenta line": "magenta-line",
        "orange line": "orange-line",
        "grey line": "grey-line"
    };
    
    return lineClasses[line.toLowerCase()] || "blue-line";
}

function generateRandomEndStation(line) {
    if (!line) return "Terminal Station";
    
    const endStations = {
        "blue line": ["Dwarka Sector 21", "Noida City Centre", "Vaishali"],
        "yellow line": ["Samaypur Badli", "HUDA City Centre"],
        "red line": ["Rithala", "Shaheed Sthal"],
        "green line": ["Brigadier Hoshiar Singh", "Inderlok"],
        "violet line": ["Raja Nahar Singh", "Kashmere Gate"],
        "pink line": ["Majlis Park", "Shiv Vihar"],
        "magenta line": ["Janakpuri West", "Botanical Garden"],
        "orange line": ["New Delhi", "IGI Airport"],
        "grey line": ["Dwarka", "Najafgarh"]
    };
    
    const lineStations = endStations[line.toLowerCase()] || ["Terminal Station"];
    return lineStations[Math.floor(Math.random() * lineStations.length)];
}

// Helper function to get line colors
function getLineColor(line) {
    if (!line) return "#0954c9";
    
    const colors = {
        "blue line": "#0052CC",
        "yellow line": "#F2C94C",
        "red line": "#EB5757",
        "green line": "#27AE60",
        "violet line": "#9B51E0",
        "pink line": "#FF69B4",
        "magenta line": "#E91E63",
        "grey line": "#828282",
        "orange line": "#F2994A",
        "rapid metro": "#219653",
        "default": "#0954c9"
    };
    return colors[line.toLowerCase()] || colors["default"];
} 