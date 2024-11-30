# 💰 Cash Flow Minimizer

Cash Flow Minimizer is a React-based application designed to simplify the settlement of debts among friends. Using **graph theory**, **greedy algorithms**, and **recursive approaches**, this app calculates and minimizes the cash flow among individuals, ensuring everyone gets their fair share with minimal transactions.

---

## 🚀 Features

- **Add and Remove Friends**: Seamlessly add participants involved in the transactions.
- **Custom Input**: Enter amounts owed among friends in a dynamic table.
- **Efficient Algorithm**: Utilizes **MaxHeap** and **MinHeap** to optimize cash flow settlements.
- **Interactive UI**: User-friendly interface with a responsive design.
- **Performance-Oriented**: Initially O(n²), optimized for O(n log n).

---

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Logic Implementation**: JavaScript with advanced data structures and algorithms
- **Styling**: CSS

---

## 🎯 How It Works

1. **Data Input**:
   Insert the amount one friend owes another in a table format.

2. **Algorithm**:
   - Computes net balances for each participant.
   - Sorts balances using heaps to maximize efficiency.
   - Minimizes transactions through a greedy, recursive algorithm.

3. **Results**:
   Outputs the minimum number of transactions required to settle all debts.

---

## 📁 File Structure

```plaintext
src/
├── webpages/
│   ├── array.js      // runs the algorithm
│   ├── home.js    // Displays home page
│   └── table.js     // Generates dynamic table takes and provide response
├── App.js           // Main application component
└── index.js         // React entry point
