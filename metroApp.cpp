#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
#include <climits>
#include <algorithm>
#include <cctype>

using namespace std;

string trim(const string& str) {
    size_t start = str.find_first_not_of(" \t");
    size_t end = str.find_last_not_of(" \t");
    return (start == string::npos) ? "" : str.substr(start, end - start + 1);
}

string normalize(const string& str) {
    string result = trim(str);
    transform(result.begin(), result.end(), result.begin(), ::tolower);
    return result;
}

class MetroGraph {
private:
    unordered_map<string, vector<pair<pair<string, int>, string>>> adjList;

public:
    void addEdge(const string& station1, const string& station2, int distance, const string& line) {
        string s1 = normalize(station1);
        string s2 = normalize(station2);
        string normalizedLine = normalize(line);
        adjList[s1].push_back({{s2, distance}, normalizedLine});
        adjList[s2].push_back({{s1, distance}, normalizedLine});
    }

    vector<pair<string, string>> findShortestPath(const string& source, const string& destination, int& totalDistance) {
        string src = normalize(source);
        string dest = normalize(destination);

        if (adjList.find(src) == adjList.end() || adjList.find(dest) == adjList.end()) {
            return {};
        }

        unordered_map<string, int> distances;
        unordered_map<string, pair<string, string>> previous;
        for (const auto& station : adjList) {
            distances[station.first] = INT_MAX;
        }

        distances[src] = 0;

        auto cmp = [](pair<int, string>& a, pair<int, string>& b) {
            return a.first > b.first;
        };
        priority_queue<pair<int, string>, vector<pair<int, string>>, decltype(cmp)> pq(cmp);

        pq.push({0, src});

        while (!pq.empty()) {
            auto [currentDist, currentStation] = pq.top();
            pq.pop();

            if (currentStation == dest) break;

            for (const auto& [neighbor, line] : adjList[currentStation]) {
                int newDist = currentDist + neighbor.second;
                if (newDist < distances[neighbor.first]) {
                    distances[neighbor.first] = newDist;
                    previous[neighbor.first] = {currentStation, line};
                    pq.push({newDist, neighbor.first});
                }
            }
        }

        vector<pair<string, string>> path;
        string at = dest;
        while (at != "" && previous.find(at) != previous.end()) {
            path.push_back({at, previous[at].second});
            at = previous[at].first;
        }
        if (at == src) {
            path.push_back({at, ""});
        }
        reverse(path.begin(), path.end());

        if (path.empty() || path[0].first != src) {
            return {};
        }

        totalDistance = distances[dest];
        return path;
    }

    int calculateFare(int distance) {
    const int baseFare = 10;
    const int perKmCharge = 2;
    int totalFare = baseFare + distance * perKmCharge;
    return min(totalFare, 60); // Cap the fare at ₹60
}


    void displayGraph() {
        for (const auto& [station, neighbors] : adjList) {
            cout << station << ": ";
            for (const auto& [neighbor, line] : neighbors) {
                cout << "(" << neighbor.first << ", " << neighbor.second << " km, " << line << ") ";
            }
            cout << endl;
        }
    }
};

int main() {
    MetroGraph metro;

    metro.addEdge("Rajiv Chowk", "Kashmere Gate", 5, "Red Line");
    metro.addEdge("Rajiv Chowk", "Central Secretariat", 3, "Yellow Line");
    metro.addEdge("Central Secretariat", "Hauz Khas", 7, "Yellow Line");
    metro.addEdge("Kashmere Gate", "Chandni Chowk", 2, "Red Line");
    metro.addEdge("Hauz Khas", "Chandni Chowk", 10, "Yellow Line");
    metro.addEdge("Lajpat Nagar", "Hauz Khas", 6, "Pink Line");
    metro.addEdge("Lajpat Nagar", "Kalkaji Mandir", 4, "Pink Line");
    metro.addEdge("Kalkaji Mandir", "Nehru Place", 2, "Pink Line");
    metro.addEdge("Nehru Place", "Govind Puri", 3, "Violet Line");
    metro.addEdge("Govind Puri", "Okhla", 5, "Violet Line");
    metro.addEdge("Okhla", "Jasola", 4, "Violet Line");
    metro.addEdge("Jasola", "Sarita Vihar", 3, "Violet Line");
    metro.addEdge("Sarita Vihar", "Mohan Estate", 6, "Violet Line");
    metro.addEdge("Mohan Estate", "Tughlakabad", 5, "Violet Line");
    metro.addEdge("Tughlakabad", "Badarpur", 7, "Violet Line");
    metro.addEdge("Badarpur", "Faridabad", 8, "Violet Line");
    metro.addEdge("Hauz Khas", "Green Park", 2, "Yellow Line");
    metro.addEdge("Green Park", "AIIMS", 2, "Yellow Line");
    metro.addEdge("AIIMS", "INA", 3, "Yellow Line");
    metro.addEdge("Dwarka", "Janakpuri West", 6, "Blue Line");
    metro.addEdge("Janakpuri West", "Rajouri Garden", 5, "Blue Line");
    metro.addEdge("Rajouri Garden", "Kirti Nagar", 3, "Blue Line");
    metro.addEdge("Kirti Nagar", "Moti Nagar", 2, "Blue Line");
    metro.addEdge("Moti Nagar", "Shadipur", 2, "Blue Line");
    metro.addEdge("Shadipur", "Karol Bagh", 3, "Blue Line");
    metro.addEdge("Karol Bagh", "Rajiv Chowk", 5, "Blue Line");

    cout << "Delhi Metro Graph:\n";
    metro.displayGraph();

    string source, destination;
    cout << "\nEnter source station: ";
    getline(cin, source);
    cout << "Enter destination station: ";
    getline(cin, destination);

    int totalDistance = 0;
    vector<pair<string, string>> path = metro.findShortestPath(source, destination, totalDistance);

    if (!path.empty()) {
        cout << "\nShortest Path from " << source << " to " << destination << ":\n";
        for (size_t i = 0; i < path.size(); ++i) {
            cout << path[i].first;
            if (i < path.size() - 1) {
                cout << " (" << path[i + 1].second << ") -> ";
            }
        }
        cout << "\nTotal Distance: " << totalDistance << " km\n";

        int fare = metro.calculateFare(totalDistance);
        cout << "Total Fare: Rs. " << fare << "\n";

    } else {
        cout << "\nNo path found between " << source << " and " << destination << "!\n";
    }

    return 0;
}
