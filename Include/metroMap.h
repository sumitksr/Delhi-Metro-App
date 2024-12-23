#ifndef METROMAP_H
#define METROMAP_H

#include "graph.h"

using namespace std;

class MetroMap {
public:
    MetroMap();
    void createMap();
    void displayMap() const;
    void findRoute(const string& source, const string& destination);

private:
    Graph graph;
    void calculateFare(int distance) const;
};

#endif
