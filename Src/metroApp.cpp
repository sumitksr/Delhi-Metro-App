#include <iostream>
#include "metroMap.h"

using namespace std;

int main() {
    MetroMap metroMap;
    string source, destination;

    cout << "Enter source station: ";
    cin >> source;
    cout << "Enter destination station: ";
    cin >> destination;

    metroMap.findRoute(source, destination);

    return 0;
}
