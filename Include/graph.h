#ifndef GRAPH_H
#define GRAPH_H

#include <iostream>
#include <vector>
#include <string>
#include <map>

using namespace std;

struct Station {
    string name;
    string corridor;
    vector<string> connectedLines;
};

class Graph {
public:
    void addStation(const string& stationName, const Station& station);
    void addConnection(const string& from, const string& to, int distance);
    int getDistance(const string& from, const string& to) const;
    vector<string> getConnections(const string& station) const;

private:
    map<string, Station> stations;
    map<pair<string, string>, int> connections;
};

#endif
