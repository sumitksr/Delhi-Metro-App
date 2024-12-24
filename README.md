# Delhi Metro Rail App

This repository contains a C++ program to simulate a Delhi Metro route management system. The system enables users to find the shortest route between two metro stations, calculate the fare based on the distance, and display the metro network graph.

## Features

- **Add Routes:** Add metro routes between stations, specifying the distance and metro line.
- **Find Shortest Path:** Compute the shortest route between two stations and calculate the total fare.
- **Display Network:** Visualize the metro network with all stations, connections, distances, and corresponding metro lines.

## Technologies Used

- Programming Language: C++
- Algorithms: Dijkstra's Algorithm (for shortest path computation
## Code Overview

### `MetroGraph` Class

The program uses the `MetroGraph` class to manage the Delhi Metro network as a graph. Below are the details of its key components:

#### 1. Graph Representation

The metro network is represented using an adjacency list:
- **Data Structure:** `unordered_map<string, vector<pair<pair<string, int>, string>>>`
  - **Key:** Station name (case-insensitive).
  - **Value:** A list of pairs, each containing:
    - Connected station name
    - Distance to the connected station
    - Metro line name

#### 2. Key Functions

- **`addEdge`:**  
  Adds a bi-directional connection between two stations with:
  - Distance between them
  - Name of the metro line

- **`findShortestPath`:**  
  Implements Dijkstra's Algorithm to compute the shortest path and total distance between two stations. It also tracks the metro lines for each segment of the route.

- **`calculateFare`:**  
  Calculates the total fare for the journey using the formula:  
  \[
  \text{Total Fare} = \text{Base Fare} + (\text{Per Km Charge} \times \text{Total Distance})
  \]
  Default values:  
  - Base Fare = ₹10  
  - Per Km Charge = ₹2  

- **`displayGraph`:**  
  Displays the entire metro network, showing all stations and their connections with distances and metro lines.

#### 3. Error Handling

- Detects and handles invalid station names by checking for their presence in the adjacency list.
- Displays a message if no valid path exists between two stations.

---

## Algorithms Used

### 1. Dijkstra's Algorithm
- Purpose: Finds the shortest path in a weighted graph.
- How it's used:  
  - Computes the shortest distance between two metro stations.
  - Tracks the path and metro lines for the shortest route.

### 2. Graph Traversal
- Purpose: Displays all stations, their connections, and respective distances and metro lines.
- How it's used:  
  - Iterates over the adjacency list and prints the network structure.


## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/username/Delhi-Metro-Rail-App.git
   cd Delhi-Metro-Rail-App
2. Compile the program:
   ```bash
   g++ -o delhi_metro metroApp.cpp

2. Run:
   ```bash
   ./delhi_metro

---

## Example Interaction

Here’s an example of how the program runs and the expected interaction:

```plaintext
Delhi Metro Graph:
rajiv chowk: (kashmere gate, 5 km, red line) (central secretariat, 3 km, yellow line) (karol bagh, 5 km, blue line) 
kashmere gate: (rajiv chowk, 5 km, red line) (chandni chowk, 2 km, red line) 
...

Enter source station: Rajiv Chowk
Enter destination station: Hauz Khas

Shortest Path from Rajiv Chowk to Hauz Khas:
Rajiv Chowk (yellow line) -> Central Secretariat (yellow line) -> Hauz Khas
Total Distance: 10 km
Total Fare: ₹30
