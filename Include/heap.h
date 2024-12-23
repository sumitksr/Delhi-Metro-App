#ifndef HEAP_H
#define HEAP_H

#include <vector>
#include <limits>

using namespace std;

class MinHeap {
public:
    MinHeap(int size);
    void insert(int node, int distance);
    int extractMin();
    bool isEmpty() const;
    void decreaseKey(int node, int newDist);

private:
    vector<int> heap;
    vector<int> distance;
    vector<int> position;
    int size;
};

#endif
