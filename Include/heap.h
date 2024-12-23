#ifndef HEAP_H
#define HEAP_H

#include <vector>
#include <utility>

class MinHeap {
public:
    void insert(int key, int value);
    int extractMin();
    void decreaseKey(int index, int newValue);
    void heapifyUp(int index);
    void heapifyDown(int index);
    void swap(int index1, int index2);

private:
    std::vector<std::pair<int, int>> heap;
};

#endif // HEAP_H
