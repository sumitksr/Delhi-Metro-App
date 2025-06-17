# Delhi Metro Route Finder 🚇

This project simulates the **Delhi Metro route system**, allowing users to plan metro journeys quickly and accurately.

Users can:

* ✅ Find the **shortest route** between two stations using Dijkstra’s algorithm
* ✅ View **total distance**, **fare**, and **metro line information**
* ✅ Interact with a clean and responsive **web interface** to explore the metro map

👉 **Live Website**: [https://delhi-metro-app-ochre.vercel.app](https://delhi-metro-app-ochre.vercel.app)
🔗 **GitHub Profile**: [@sumitksr](https://github.com/sumitksr)

---

## 🌟 Features

* 🔍 **Route Finder**: Enter source and destination stations to get the shortest path
* 🗺️ **Metro Line Guidance**: Each segment shows the corresponding metro line
* 📏 **Distance Calculation**: Total kilometers are displayed for your trip
* 💸 **Fare Estimator**: Get the fare using: ₹10 base + ₹2/km
* 📊 **Network View**: Full graph of the metro network rendered in a readable format
* 💻 **Fully Client-side**: Built using **HTML**, **CSS**, and **JavaScript**
* 🖼️ **Responsive UI**: Mobile-friendly and optimized for various screen sizes
* 📂 **Modular Code**: Separated files for map rendering, data handling, and styling

---

## 🧠 Algorithms Used

### Dijkstra's Algorithm

* Used to find the **shortest path** in a weighted graph.
* Accounts for multiple paths, selecting the one with the minimum total distance.
* Tracks metro line transitions and segments clearly.

### Fare Calculation Formula

$$
\text{Total Fare} = \text{Base Fare} + (\text{Per Km Charge} \times \text{Total Distance})
$$

* **Base Fare:** ₹10
* **Per Km Charge:** ₹2

---

## 🧰 Tech Stack

| Feature              | Tech Used                                    |
| -------------------- | -------------------------------------------- |
| Shortest Path Logic  | C++ (Dijkstra)                               |
| Executable Generator | `metroApp.cpp` compiled to `delhi_metro.exe` |
| Web UI               | HTML, CSS, JavaScript                        |
| Hosting              | Vercel                                       |


---

## 🚀 How to Run Locally

### Option 1: View Website

Simply open [https://delhi-metro-app-ochre.vercel.app](https://delhi-metro-app-ochre.vercel.app) in any browser.

### Option 2: Run C++ Program

1. Clone the repo:

```bash
git clone https://github.com/sumitksr/Delhi-Metro-App.git
cd Delhi-Metro-App
```

2. Compile:

```bash
g++ -o delhi_metro metroApp.cpp
```

3. Run:

```bash
./delhi_metro
```

---

## ✨ Example Output

```
Enter source station: Rajiv Chowk
Enter destination station: Hauz Khas

Shortest Path:
Rajiv Chowk (yellow line) -> Central Secretariat (yellow line) -> Hauz Khas
Total Distance: 10 km
Total Fare: ₹30
```

---

## 📁 Project Structure

```
Delhi-Metro-App/
├── index.html          # Home page
├── about.html          # Info page
├── map.html            # Metro map UI
├── results.html        # Shows path and fare
├── map.js              # Logic to load and handle station data
├── metro.js            # Main graph and algorithm logic in JS
├── results.js          # Displays result info
├── styles.css          # Styling
├── metroApp.cpp        # Original C++ implementation
├── delhi_metro.exe     # Executable from C++ code
├── images/             # Metro icons/images
├── output/             # Program output or logs
└── .vscode/            # VSCode config files
```

---

> **Made with ❤️ by Sumit**

