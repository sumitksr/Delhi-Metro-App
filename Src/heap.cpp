#include "heap.h"
#include <algorithm>

void MinHeap::insert(int key, int value) {
    heap.push_back({key, value});
    heapifyUp(heap.size() - 1);
}

int MinHeap::extractMin() {
    if (heap.size() == 0) {
        return -1;
    }
    swap(0, heap.size() - 1);
    int minElement = heap.back().first;
    heap.pop_back();
    heapifyDown(0);
    return minElement;
}

void MinHeap::decreaseKey(int index, int newValue) {
    heap[index].first = newValue;
    heapifyUp(index);
}

void MinHeap::heapifyUp(int index) {
    while (index > 0 && heap[index].first < heap[(index - 1) / 2].first) {
        swap(index, (index - 1) / 2);
        index = (index - 1) / 2;
    }
}

void MinHeap::heapifyDown(int index) {
    int leftChild = 2 * index + 1;
    int rightChild = 2 * index + 2;
    int smallest = index;

    if (leftChild < heap.size() && heap[leftChild].first < heap[smallest].first)
        smallest = leftChild;
    if (rightChild < heap.size() && heap[rightChild].first < heap[smallest].first)
        smallest = rightChild;

    if (smallest != index) {
        swap(index, smallest);
        heapifyDown(smallest);
    }
}

void MinHeap::swap(int index1, int index2) {
    std::swap(heap[index1], heap[index2]);
}
