#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> depths;

    int value;
    while (cin >> value) {
        depths.push_back(value);
    }

    int increaseCount = 0;
    int decreaseCount = 0;
    for (uint i = 1; i < depths.size(); ++i) {
        if (depths[i] > depths[i - 1]) {
            increaseCount++;
        }
        else if (depths[i] < depths[i - 1]) {
            decreaseCount++;
        }
    }

    cout << increaseCount << endl;
    return 0;
}
