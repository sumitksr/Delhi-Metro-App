#include "graph.h"

void Graph::addStation(const string& stationName, const Station& station) {
    stations[stationName] = station;
}

void Graph::addConnection(const string& from, const string& to, int distance) {
    connections[{from, to}] = distance;
    connections[{to, from}] = distance;  
}

int Graph::getDistance(const string& from, const string& to) const {
    auto it = connections.find({from, to});
    return (it != connections.end()) ? it->second : -1;  // Return -1 if no connection
}

vector<string> Graph::getConnections(const string& station) const {
    vector<string> connectedStations;
    for (const auto& conn : connections) {
        if (conn.first.first == station) {
            connectedStations.push_back(conn.first.second);
        }
    }
    return connectedStations;
}
