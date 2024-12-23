#include "metroMap.h"
#include <iostream>
#include <queue>
#include <vector>
#include <unordered_map>
#include <climits>

using namespace std;

MetroMap::MetroMap() {
    createMap();
}

void MetroMap::createMap() {
 
    Station rajivChowk = {"Rajiv Chowk", "Blue Line", {"Blue", "Yellow"}};
    Station connaughtPlace = {"Connaught Place", "Blue Line", {"Blue"}};
    Station hauzKhas = {"Hauz Khas", "Yellow Line", {"Yellow", "Violet"}};
    Station saket = {"Saket", "Yellow Line", {"Yellow"}};
    Station newDelhi = {"New Delhi", "Blue Line", {"Blue", "Yellow"}};
    
    graph.addStation("Rajiv Chowk", rajivChowk);
    graph.addStation("Connaught Place", connaughtPlace);
    graph.addStation("Hauz Khas", hauzKhas);
    graph.addStation("Saket", saket);
    graph.addStation("New Delhi", newDelhi);

    graph.addConnection("Rajiv Chowk", "Connaught Place", 2);
    graph.addConnection("Rajiv Chowk", "New Delhi", 3);
    graph.addConnection("Rajiv Chowk", "Hauz Khas", 5);
    graph.addConnection("New Delhi", "Saket", 6);
    graph.addConnection("Hauz Khas", "Saket", 4);
}

void MetroMap::displayMap() const {
    cout << "Metro Map:" << endl;
    for (const auto& station : graph.getConnections("Rajiv Chowk")) {
        cout << "Rajiv Chowk -> " << station << endl;
    }

}

void MetroMap::findRoute(const string& source, const string& destination) {
    unordered_map<string, int> distances;
    unordered_map<string, string> previous;
    priority_queue<pair<int, string>, vector<pair<int, string>>, greater<pair<int, string>>> pq;
    

    for (const auto& station : graph.getConnections(source)) {
        distances[station] = INT_MAX;
    }
    distances[source] = 0;
    pq.push({0, source});
    
    while (!pq.empty()) {
        auto [currentDist, currentStation] = pq.top();
        pq.pop();

        if (currentStation == destination) {
            break;
        }

        for (const auto& neighbor : graph.getConnections(currentStation)) {
            int distance = graph.getDistance(currentStation, neighbor);
            int newDist = currentDist + distance;

            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                previous[neighbor] = currentStation;
                pq.push({newDist, neighbor});
            }
        }
    }
    vector<string> path;
    string current = destination;
    while (current != source) {
        path.push_back(current);
        current = previous[current];
    }
    path.push_back(source);

    cout << "Shortest route from " << source << " to " << destination << ": ";
    for (auto it = path.rbegin(); it != path.rend(); ++it) {
        cout << *it << " ";
    }
    cout << endl;
    calculateFare(distances[destination]);
}

void MetroMap::calculateFare(int distance) const {
  
    cout << "Fare: ₹" << distance * 5 << endl;
}
