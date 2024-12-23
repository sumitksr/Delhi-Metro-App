#include "heap.h"
#include <limits>
#include <iostream>

MinHeap::MinHeap(int size) : size(size) {
    heap.resize(size, -1);
    distance.resize(size, numeric_limits<int>::max());
    position.resize(size, -1);
}

void MinHeap::insert(int node, int dist) {

    distance[node] = dist;
    heap.push_back(node);
    position[node] = heap.size() - 1;


    heapifyUp(heap.size() - 1);
}

int MinHeap::extractMin() {
    if (heap.empty()) {
        return -1; 
    }

    int minNode = heap[0];

    swap(0, heap.size() - 1);
    heap.pop_back();

    heapifyDown(0);

    return minNode;
}

bool MinHeap::isEmpty() const {
    return heap.empty();
}

void MinHeap::decreaseKey(int node, int newDist) {

    distance[node] = newDist;

    int index = position[node];
    heapifyUp(index);
}

void MinHeap::heapifyUp(int index) {

    while (index > 0 && distance[heap[index]] < distance[heap[(index - 1) / 2]]) {
        swap(index, (index - 1) / 2);
        index = (index - 1) / 2;
    }
}

void MinHeap::heapifyDown(int index) {
    int leftChild = 2 * index + 1;
    int rightChild = 2 * index + 2;
    int smallest = index;

    if (leftChild < heap.size() && distance[heap[leftChild]] < distance[heap[smallest]]) {
        smallest = leftChild;
    }

    if (rightChild < heap.size() && distance[heap[rightChild]] < distance[heap[smallest]]) {
        smallest = rightChild;
    }

    if (smallest != index) {
        swap(index, smallest);
        heapifyDown(smallest);
    }
}

void MinHeap::swap(int index1, int index2) {

    int temp = heap[index1];
    heap[index1] = heap[index2];
    heap[index2] = temp;

    position[heap[index1]] = index1;
    position[heap[index2]] = index2;
}
