class MetroGraph {
    constructor() {
        this.adjList = new Map();
        this.stations = new Set();
        this.initializeGraph();
    }

    normalize(str) {
        return str.trim().toLowerCase();
    }

    addEdge(station1, station2, distance, line) {
        const s1 = this.normalize(station1);
        const s2 = this.normalize(station2);
        const normalizedLine = this.normalize(line);

        this.stations.add(s1);
        this.stations.add(s2);

        if (!this.adjList.has(s1)) {
            this.adjList.set(s1, []);
        }
        if (!this.adjList.has(s2)) {
            this.adjList.set(s2, []);
        }

        this.adjList.get(s1).push({ station: s2, distance, line: normalizedLine });
        this.adjList.get(s2).push({ station: s1, distance, line: normalizedLine });
    }

    findShortestPath(source, destination) {
        const src = this.normalize(source);
        const dest = this.normalize(destination);

        if (!this.adjList.has(src) || !this.adjList.has(dest)) {
            return null;
        }

        const distances = new Map();
        const previous = new Map();
        const pq = new PriorityQueue();

        // Initialize distances
        for (const [station] of this.adjList) {
            distances.set(station, Infinity);
        }
        distances.set(src, 0);

        pq.enqueue(src, 0);

        while (!pq.isEmpty()) {
            const [currentStation, currentDist] = pq.dequeue();

            if (currentStation === dest) break;

            for (const neighbor of this.adjList.get(currentStation)) {
                const newDist = currentDist + neighbor.distance;
                if (newDist < distances.get(neighbor.station)) {
                    distances.set(neighbor.station, newDist);
                    previous.set(neighbor.station, { station: currentStation, line: neighbor.line });
                    pq.enqueue(neighbor.station, newDist);
                }
            }
        }

        // Reconstruct path
        const path = [];
        let current = dest;
        while (current && previous.has(current)) {
            const prev = previous.get(current);
            path.unshift({ station: current, line: prev.line });
            current = prev.station;
        }
        if (current === src) {
            path.unshift({ station: current, line: "" });
        }

        if (path.length === 0 || path[0].station !== src) {
            return null;
        }

        return {
            path,
            totalDistance: distances.get(dest)
        };
    }

    calculateFare(distance) {
        const baseFare = 10;
        const perKmCharge = 2;
        const totalFare = baseFare + distance * perKmCharge;
        return Math.min(totalFare, 60); // Cap the fare at ₹60
    }

    initializeGraph() {
        // Blue Line
        this.addEdge("Dwarka Sector 21", "Dwarka Sector 8", 3, "Blue Line");
        this.addEdge("Dwarka Sector 8", "Dwarka Sector 9", 1, "Blue Line");
        this.addEdge("Dwarka Sector 9", "Dwarka Sector 10", 1, "Blue Line");
        this.addEdge("Dwarka Sector 10", "Dwarka Sector 11", 1, "Blue Line");
        this.addEdge("Dwarka Sector 11", "Dwarka Sector 12", 1, "Blue Line");
        this.addEdge("Dwarka Sector 12", "Dwarka Sector 13", 1, "Blue Line");
        this.addEdge("Dwarka Sector 13", "Dwarka Sector 14", 1, "Blue Line");
        this.addEdge("Dwarka Sector 14", "Dwarka", 1, "Blue Line");
        this.addEdge("Dwarka", "Dwarka Mor", 2, "Blue Line");
        this.addEdge("Dwarka Mor", "Nawada", 2, "Blue Line");
        this.addEdge("Nawada", "Uttam Nagar West", 2, "Blue Line");
        this.addEdge("Uttam Nagar West", "Uttam Nagar East", 2, "Blue Line");
        this.addEdge("Uttam Nagar East", "Janakpuri West", 2, "Blue Line");
        this.addEdge("Janakpuri West", "Janakpuri East", 2, "Blue Line");
        this.addEdge("Janakpuri East", "Tilak Nagar", 1.5, "Blue Line");
        this.addEdge("Tilak Nagar", "Subhash Nagar", 1.5, "Blue Line");
        this.addEdge("Subhash Nagar", "Tagore Garden", 1.5, "Blue Line");
        this.addEdge("Tagore Garden", "Rajouri Garden", 1.5, "Blue Line");
        this.addEdge("Rajouri Garden", "Ramesh Nagar", 1.5, "Blue Line");
        this.addEdge("Ramesh Nagar", "Moti Nagar", 1.5, "Blue Line");
        this.addEdge("Moti Nagar", "Kirti Nagar", 1.5, "Blue Line");
        this.addEdge("Kirti Nagar", "Shadipur", 1.5, "Blue Line");
        this.addEdge("Shadipur", "Patel Nagar", 1.5, "Blue Line");
        this.addEdge("Patel Nagar", "Rajendra Place", 1.5, "Blue Line");
        this.addEdge("Rajendra Place", "Karol Bagh", 1.5, "Blue Line");
        this.addEdge("Karol Bagh", "Jhandewalan", 1.5, "Blue Line");
        this.addEdge("Jhandewalan", "Ramakrishna Ashram Marg", 1.5, "Blue Line");
        this.addEdge("Ramakrishna Ashram Marg", "Rajiv Chowk", 1.5, "Blue Line");
        this.addEdge("Rajiv Chowk", "Barakhamba Road", 1, "Blue Line");
        this.addEdge("Barakhamba Road", "Mandi House", 1, "Blue Line");
        this.addEdge("Mandi House", "Pragati Maidan", 1.5, "Blue Line");
        this.addEdge("Pragati Maidan", "Indraprastha", 1.5, "Blue Line");
        this.addEdge("Indraprastha", "Yamuna Bank", 2, "Blue Line");
        this.addEdge("Yamuna Bank", "Akshardham", 2, "Blue Line");
        this.addEdge("Akshardham", "Mayur Vihar Phase 1", 2, "Blue Line");
        this.addEdge("Mayur Vihar Phase 1", "Mayur Vihar Extension", 2, "Blue Line");
        this.addEdge("Mayur Vihar Extension", "New Ashok Nagar", 2, "Blue Line");
        this.addEdge("New Ashok Nagar", "Noida Sector 15", 2, "Blue Line");
        this.addEdge("Noida Sector 15", "Noida Sector 16", 2, "Blue Line");
        this.addEdge("Noida Sector 16", "Noida Sector 18", 2, "Blue Line");
        this.addEdge("Noida Sector 18", "Botanical Garden", 2, "Blue Line");
        this.addEdge("Botanical Garden", "Golf Course", 2, "Blue Line");
        this.addEdge("Golf Course", "Noida City Centre", 2, "Blue Line");
        this.addEdge("Noida City Centre", "Noida Sector 62", 3, "Blue Line");
        
        // Blue Line Branch (Yamuna Bank to Vaishali)
        this.addEdge("Yamuna Bank", "Laxmi Nagar", 2, "Blue Line");
        this.addEdge("Laxmi Nagar", "Nirman Vihar", 1.5, "Blue Line");
        this.addEdge("Nirman Vihar", "Preet Vihar", 1.5, "Blue Line");
        this.addEdge("Preet Vihar", "Karkarduma", 1.5, "Blue Line");
        this.addEdge("Karkarduma", "Anand Vihar ISBT", 2, "Blue Line");
        this.addEdge("Anand Vihar ISBT", "Kaushambi", 1.5, "Blue Line");
        this.addEdge("Kaushambi", "Vaishali", 1.5, "Blue Line");
        
        // Yellow Line
        this.addEdge("Samaypur Badli", "Rohini Sector 18, 19", 2, "Yellow Line");
        this.addEdge("Rohini Sector 18, 19", "Haiderpur Badli Mor", 2, "Yellow Line");
        this.addEdge("Haiderpur Badli Mor", "Jahangirpuri", 2, "Yellow Line");
        this.addEdge("Jahangirpuri", "Adarsh Nagar", 2, "Yellow Line");
        this.addEdge("Adarsh Nagar", "Azadpur", 2, "Yellow Line");
        this.addEdge("Azadpur", "Model Town", 2, "Yellow Line");
        this.addEdge("Model Town", "GTB Nagar", 2, "Yellow Line");
        this.addEdge("GTB Nagar", "Vishwa Vidyalaya", 2, "Yellow Line");
        this.addEdge("Vishwa Vidyalaya", "Vidhan Sabha", 2, "Yellow Line");
        this.addEdge("Vidhan Sabha", "Civil Lines", 2, "Yellow Line");
        this.addEdge("Civil Lines", "Kashmere Gate", 2, "Yellow Line");
        this.addEdge("Kashmere Gate", "Chandni Chowk", 2, "Yellow Line");
        this.addEdge("Chandni Chowk", "Chawri Bazar", 1.5, "Yellow Line");
        this.addEdge("Chawri Bazar", "New Delhi", 1.5, "Yellow Line");
        this.addEdge("New Delhi", "Rajiv Chowk", 1, "Yellow Line");
        this.addEdge("Rajiv Chowk", "Patel Chowk", 1.5, "Yellow Line");
        this.addEdge("Patel Chowk", "Central Secretariat", 1, "Yellow Line");
        this.addEdge("Central Secretariat", "Udyog Bhawan", 1, "Yellow Line");
        this.addEdge("Udyog Bhawan", "Lok Kalyan Marg", 2, "Yellow Line");
        this.addEdge("Lok Kalyan Marg", "Jor Bagh", 1.5, "Yellow Line");
        this.addEdge("Jor Bagh", "INA", 2, "Yellow Line");
        this.addEdge("INA", "AIIMS", 1.5, "Yellow Line");
        this.addEdge("AIIMS", "Green Park", 1.5, "Yellow Line");
        this.addEdge("Green Park", "Hauz Khas", 2, "Yellow Line");
        this.addEdge("Hauz Khas", "Malviya Nagar", 2, "Yellow Line");
        this.addEdge("Malviya Nagar", "Saket", 2, "Yellow Line");
        this.addEdge("Saket", "Qutub Minar", 2, "Yellow Line");
        this.addEdge("Qutub Minar", "Chhattarpur", 2, "Yellow Line");
        this.addEdge("Chhattarpur", "Sultanpur", 2, "Yellow Line");
        this.addEdge("Sultanpur", "Ghitorni", 2, "Yellow Line");
        this.addEdge("Ghitorni", "Arjan Garh", 2, "Yellow Line");
        this.addEdge("Arjan Garh", "Guru Dronacharya", 2, "Yellow Line");
        this.addEdge("Guru Dronacharya", "Sikanderpur", 2, "Yellow Line");
        this.addEdge("Sikanderpur", "MG Road", 2, "Yellow Line");
        this.addEdge("MG Road", "IFFCO Chowk", 2, "Yellow Line");
        this.addEdge("IFFCO Chowk", "Huda City Centre", 2, "Yellow Line");
        
        // Red Line
        this.addEdge("Rithala", "Rohini West", 2, "Red Line");
        this.addEdge("Rohini West", "Rohini East", 2, "Red Line");
        this.addEdge("Rohini East", "Pitampura", 2, "Red Line");
        this.addEdge("Pitampura", "Kohat Enclave", 2, "Red Line");
        this.addEdge("Kohat Enclave", "Netaji Subhash Place", 2, "Red Line");
        this.addEdge("Netaji Subhash Place", "Keshav Puram", 2, "Red Line");
        this.addEdge("Keshav Puram", "Kanhaiya Nagar", 1.5, "Red Line");
        this.addEdge("Kanhaiya Nagar", "Inderlok", 1.5, "Red Line");
        this.addEdge("Inderlok", "Shastri Nagar", 1.5, "Red Line");
        this.addEdge("Shastri Nagar", "Pratap Nagar", 1.5, "Red Line");
        this.addEdge("Pratap Nagar", "Pulbangash", 1.5, "Red Line");
        this.addEdge("Pulbangash", "Tis Hazari", 1, "Red Line");
        this.addEdge("Tis Hazari", "Kashmere Gate", 1.5, "Red Line");
        this.addEdge("Kashmere Gate", "Shastri Park", 2, "Red Line");
        this.addEdge("Shastri Park", "Seelampur", 2, "Red Line");
        this.addEdge("Seelampur", "Welcome", 1.5, "Red Line");
        this.addEdge("Welcome", "Shahdara", 1.5, "Red Line");
        this.addEdge("Shahdara", "Mansarovar Park", 1.5, "Red Line");
        this.addEdge("Mansarovar Park", "Jhilmil", 1.5, "Red Line");
        this.addEdge("Jhilmil", "Dilshad Garden", 1.5, "Red Line");
        this.addEdge("Dilshad Garden", "Shaheed Nagar", 2, "Red Line");
        this.addEdge("Shaheed Nagar", "Raj Bagh", 2, "Red Line");
        this.addEdge("Raj Bagh", "Rajendra Nagar", 2, "Red Line");
        this.addEdge("Rajendra Nagar", "Shyam Park", 2, "Red Line");
        this.addEdge("Shyam Park", "Mohan Nagar", 2, "Red Line");
        this.addEdge("Mohan Nagar", "Arthala", 2, "Red Line");
        this.addEdge("Arthala", "Hindon River", 2, "Red Line");
        this.addEdge("Hindon River", "Shaheed Sthal", 2, "Red Line");
        
        // Green Line
        this.addEdge("Inderlok", "Ashok Park Main", 2, "Green Line");
        this.addEdge("Ashok Park Main", "Punjabi Bagh", 2, "Green Line");
        this.addEdge("Punjabi Bagh", "Shivaji Park", 2, "Green Line");
        this.addEdge("Shivaji Park", "Madipur", 1.5, "Green Line");
        this.addEdge("Madipur", "Paschim Vihar East", 1.5, "Green Line");
        this.addEdge("Paschim Vihar East", "Paschim Vihar West", 1.5, "Green Line");
        this.addEdge("Paschim Vihar West", "Peera Garhi", 1.5, "Green Line");
        this.addEdge("Peera Garhi", "Udyog Nagar", 1.5, "Green Line");
        this.addEdge("Udyog Nagar", "Surajmal Stadium", 1.5, "Green Line");
        this.addEdge("Surajmal Stadium", "Nangloi", 1.5, "Green Line");
        this.addEdge("Nangloi", "Nangloi Railway Station", 1.5, "Green Line");
        this.addEdge("Nangloi Railway Station", "Rajdhani Park", 1.5, "Green Line");
        this.addEdge("Rajdhani Park", "Mundka", 1.5, "Green Line");
        this.addEdge("Mundka", "Mundka Industrial Area", 2, "Green Line");
        this.addEdge("Mundka Industrial Area", "Ghevra", 2, "Green Line");
        this.addEdge("Ghevra", "Tikri Kalan", 2, "Green Line");
        this.addEdge("Tikri Kalan", "Tikri Border", 2, "Green Line");
        this.addEdge("Tikri Border", "Pandit Shree Ram Sharma", 2, "Green Line");
        this.addEdge("Pandit Shree Ram Sharma", "Bahadurgarh City", 2, "Green Line");
        this.addEdge("Bahadurgarh City", "Brigadier Hoshiar Singh", 2, "Green Line");
        
        // Green Line Extension
        this.addEdge("Ashok Park Main", "Satguru Ram Singh Marg", 1.5, "Green Line");
        this.addEdge("Satguru Ram Singh Marg", "Kirti Nagar", 1.5, "Green Line");
        
        // Violet Line
        this.addEdge("Kashmere Gate", "Lal Quila", 2, "Violet Line");
        this.addEdge("Lal Quila", "Jama Masjid", 1.5, "Violet Line");
        this.addEdge("Jama Masjid", "Delhi Gate", 1.5, "Violet Line");
        this.addEdge("Delhi Gate", "ITO", 1.5, "Violet Line");
        this.addEdge("ITO", "Mandi House", 1, "Violet Line");
        this.addEdge("Mandi House", "Janpath", 1, "Violet Line");
        this.addEdge("Janpath", "Central Secretariat", 1, "Violet Line");
        this.addEdge("Central Secretariat", "Khan Market", 1.5, "Violet Line");
        this.addEdge("Khan Market", "JLN Stadium", 1.5, "Violet Line");
        this.addEdge("JLN Stadium", "Jangpura", 1.5, "Violet Line");
        this.addEdge("Jangpura", "Lajpat Nagar", 1.5, "Violet Line");
        this.addEdge("Lajpat Nagar", "Moolchand", 1.5, "Violet Line");
        this.addEdge("Moolchand", "Kailash Colony", 1.5, "Violet Line");
        this.addEdge("Kailash Colony", "Nehru Place", 1.5, "Violet Line");
        this.addEdge("Nehru Place", "Kalkaji Mandir", 1.5, "Violet Line");
        this.addEdge("Kalkaji Mandir", "Govind Puri", 1.5, "Violet Line");
        this.addEdge("Govind Puri", "Harkesh Nagar Okhla", 1.5, "Violet Line");
        this.addEdge("Harkesh Nagar Okhla", "Jasola Apollo", 1.5, "Violet Line");
        this.addEdge("Jasola Apollo", "Sarita Vihar", 1.5, "Violet Line");
        this.addEdge("Sarita Vihar", "Mohan Estate", 2, "Violet Line");
        this.addEdge("Mohan Estate", "Tughlakabad", 2, "Violet Line");
        this.addEdge("Tughlakabad", "Badarpur", 2, "Violet Line");
        this.addEdge("Badarpur", "Escorts Mujesar", 2.5, "Violet Line");
        this.addEdge("Escorts Mujesar", "Bata Chowk", 2, "Violet Line");
        this.addEdge("Bata Chowk", "Neelam Chowk Ajronda", 2, "Violet Line");
        this.addEdge("Neelam Chowk Ajronda", "Old Faridabad", 2, "Violet Line");
        this.addEdge("Old Faridabad", "Raja Nahar Singh", 2, "Violet Line");
        
        // Pink Line
        this.addEdge("Majlis Park", "Azadpur", 2, "Pink Line");
        this.addEdge("Azadpur", "Shalimar Bagh", 2, "Pink Line");
        this.addEdge("Shalimar Bagh", "Netaji Subhash Place", 2, "Pink Line");
        this.addEdge("Netaji Subhash Place", "Shakurpur", 2, "Pink Line");
        this.addEdge("Shakurpur", "Punjabi Bagh West", 2, "Pink Line");
        this.addEdge("Punjabi Bagh West", "ESI Hospital", 2, "Pink Line");
        this.addEdge("ESI Hospital", "Rajouri Garden", 2, "Pink Line");
        this.addEdge("Rajouri Garden", "Maya Puri", 2, "Pink Line");
        this.addEdge("Maya Puri", "Naraina Vihar", 2, "Pink Line");
        this.addEdge("Naraina Vihar", "Delhi Cantt", 2, "Pink Line");
        this.addEdge("Delhi Cantt", "Durgabai Deshmukh South Campus", 2, "Pink Line");
        this.addEdge("Durgabai Deshmukh South Campus", "Sir Vishweshwaraiah Moti Bagh", 2, "Pink Line");
        this.addEdge("Sir Vishweshwaraiah Moti Bagh", "Bhikaji Cama Place", 2, "Pink Line");
        this.addEdge("Bhikaji Cama Place", "Sarojini Nagar", 2, "Pink Line");
        this.addEdge("Sarojini Nagar", "INA", 2, "Pink Line");
        this.addEdge("INA", "South Extension", 2, "Pink Line");
        this.addEdge("South Extension", "Lajpat Nagar", 2, "Pink Line");
        this.addEdge("Lajpat Nagar", "Vinobapuri", 2, "Pink Line");
        this.addEdge("Vinobapuri", "Ashram", 2, "Pink Line");
        this.addEdge("Ashram", "Hazrat Nizamuddin", 2, "Pink Line");
        this.addEdge("Hazrat Nizamuddin", "Mayur Vihar Phase 1", 2.5, "Pink Line");
        this.addEdge("Mayur Vihar Phase 1", "Mayur Vihar Pocket 1", 2, "Pink Line");
        this.addEdge("Mayur Vihar Pocket 1", "Trilokpuri Sanjay Lake", 2, "Pink Line");
        this.addEdge("Trilokpuri Sanjay Lake", "East Vinod Nagar", 2, "Pink Line");
        this.addEdge("East Vinod Nagar", "IP Extension", 2, "Pink Line");
        this.addEdge("IP Extension", "Anand Vihar", 2, "Pink Line");
        this.addEdge("Anand Vihar", "Karkarduma", 2, "Pink Line");
        this.addEdge("Karkarduma", "Karkarduma Court", 1.5, "Pink Line");
        this.addEdge("Karkarduma Court", "Krishna Nagar", 1.5, "Pink Line");
        this.addEdge("Krishna Nagar", "East Azad Nagar", 1.5, "Pink Line");
        this.addEdge("East Azad Nagar", "Welcome", 1.5, "Pink Line");
        this.addEdge("Welcome", "Jaffrabad", 1.5, "Pink Line");
        this.addEdge("Jaffrabad", "Maujpur", 1.5, "Pink Line");
        this.addEdge("Maujpur", "Gokulpuri", 1.5, "Pink Line");
        this.addEdge("Gokulpuri", "Johri Enclave", 1.5, "Pink Line");
        this.addEdge("Johri Enclave", "Shiv Vihar", 1.5, "Pink Line");
        
        // Magenta Line
        this.addEdge("Janakpuri West", "Dabri Mor", 2, "Magenta Line");
        this.addEdge("Dabri Mor", "Dashrath Puri", 1.5, "Magenta Line");
        this.addEdge("Dashrath Puri", "Palam", 1.5, "Magenta Line");
        this.addEdge("Palam", "Sadar Bazar Cantonment", 2, "Magenta Line");
        this.addEdge("Sadar Bazar Cantonment", "Terminal 1 IGI Airport", 2.5, "Magenta Line");
        this.addEdge("Terminal 1 IGI Airport", "Shankar Vihar", 2, "Magenta Line");
        this.addEdge("Shankar Vihar", "Vasant Vihar", 2, "Magenta Line");
        this.addEdge("Vasant Vihar", "Munirka", 1.5, "Magenta Line");
        this.addEdge("Munirka", "RK Puram", 1.5, "Magenta Line");
        this.addEdge("RK Puram", "IIT", 1.5, "Magenta Line");
        this.addEdge("IIT", "Hauz Khas", 1.5, "Magenta Line");
        this.addEdge("Hauz Khas", "Panchsheel Park", 1.5, "Magenta Line");
        this.addEdge("Panchsheel Park", "Chirag Delhi", 1.5, "Magenta Line");
        this.addEdge("Chirag Delhi", "Greater Kailash", 1.5, "Magenta Line");
        this.addEdge("Greater Kailash", "Nehru Enclave", 1.5, "Magenta Line");
        this.addEdge("Nehru Enclave", "Kalkaji Mandir", 1.5, "Magenta Line");
        this.addEdge("Kalkaji Mandir", "Okhla NSIC", 1.5, "Magenta Line");
        this.addEdge("Okhla NSIC", "Sukhdev Vihar", 1.5, "Magenta Line");
        this.addEdge("Sukhdev Vihar", "Jamia Millia Islamia", 1.5, "Magenta Line");
        this.addEdge("Jamia Millia Islamia", "Okhla Vihar", 1.5, "Magenta Line");
        this.addEdge("Okhla Vihar", "Jasola Vihar Shaheen Bagh", 1.5, "Magenta Line");
        this.addEdge("Jasola Vihar Shaheen Bagh", "Kalindi Kunj", 1.5, "Magenta Line");
        this.addEdge("Kalindi Kunj", "Okhla Bird Sanctuary", 1.5, "Magenta Line");
        this.addEdge("Okhla Bird Sanctuary", "Botanical Garden", 1.5, "Magenta Line");
        
        // Orange Line (Airport Express)
        this.addEdge("New Delhi", "Shivaji Stadium", 2, "Orange Line");
        this.addEdge("Shivaji Stadium", "Dhaula Kuan", 5, "Orange Line");
        this.addEdge("Dhaula Kuan", "Delhi Aerocity", 4, "Orange Line");
        this.addEdge("Delhi Aerocity", "IGI Airport", 3, "Orange Line");
        this.addEdge("IGI Airport", "Dwarka Sector 21", 4, "Orange Line");
        
        // Gray Line
        this.addEdge("Dwarka", "Nangli", 2, "Grey Line");
        this.addEdge("Nangli", "Najafgarh", 2, "Grey Line");
        this.addEdge("Najafgarh", "Dhansa Bus Stand", 2, "Grey Line");
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        const item = this.values.shift();
        return [item.val, item.priority];
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.values.length === 0;
    }
}

// Function to swap source and destination stations
function swapStations() {
    const sourceInput = document.getElementById('source');
    const destinationInput = document.getElementById('destination');
    const tempValue = sourceInput.value;
    sourceInput.value = destinationInput.value;
    destinationInput.value = tempValue;
}

// Create metro graph instance
const metro = new MetroGraph();

// Autocomplete functionality
function autocomplete(input, itemsContainer) {
    input.addEventListener("input", function() {
        const val = this.value.toLowerCase();
        itemsContainer.innerHTML = "";
        itemsContainer.style.display = "none";

        if (val.length < 2) return;

        const matches = Array.from(metro.stations)
            .filter(station => station.includes(val))
            .slice(0, 5);

        if (matches.length > 0) {
            // Position the dropdown properly
            const inputRect = input.getBoundingClientRect();
            itemsContainer.style.width = `${inputRect.width}px`;
            
            if (input.id === 'destination') {
                itemsContainer.style.left = 'auto';
                itemsContainer.style.right = '0';
            } else {
                itemsContainer.style.left = '0';
                itemsContainer.style.right = 'auto';
            }
            
            itemsContainer.style.display = "block";
            
            matches.forEach(match => {
                const div = document.createElement("div");
                div.innerHTML = capitalizeWords(match);
                div.addEventListener("click", function() {
                    input.value = capitalizeWords(match);
                    itemsContainer.style.display = "none";
                });
                itemsContainer.appendChild(div);
            });
        }
    });

    // Close the autocomplete list when clicking outside
    document.addEventListener("click", function(e) {
        if (e.target !== input) {
            itemsContainer.style.display = "none";
        }
    });
}

// Helper function to capitalize words
function capitalizeWords(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Initialize autocomplete for both inputs
document.addEventListener("DOMContentLoaded", function() {
    const sourceInput = document.getElementById("source");
    const destinationInput = document.getElementById("destination");
    const sourceItems = document.getElementById("sourceItems");
    const destinationItems = document.getElementById("destinationItems");

    autocomplete(sourceInput, sourceItems);
    autocomplete(destinationInput, destinationItems);
});

// Function to find and display the path
function findPath(event) {
    event.preventDefault();
    
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;

    if (!source || !destination) {
        alert('Please enter both source and destination stations');
        return false;
    }

    // Redirect to results page with parameters
    window.location.href = `results.html?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}`;
    return false;
} 