#include <iostream>
#include <vector>
using namespace std;

int getSum(vector<int> arr) {
    int sum = 0;
    for (uint i = 0; i < arr.size(); ++i) {
        sum += arr[i];
    }
    return sum;
}

vector<int> slice(vector<int> const &v, int m, int n)
{
    auto first = v.cbegin() + m;
    auto last = v.cbegin() + n + 1;
 
    vector<int> vec(first, last);
    return vec;
}

vector<int> getWindow(vector<int> arr, int center) {
    return slice(arr, center - 1, center + 1);
}

int main() {
    vector<int> depths;

    int value;
    while (cin >> value) {
        depths.push_back(value);
    }

    int increaseCount = 0;
    int decreaseCount = 0;
    for (uint i = 1; i < depths.size() - 1; ++i) {
        auto currentWindow = getWindow(depths, i);
        auto nextWindow = getWindow(depths, i + 1);

        if (getSum(currentWindow) < getSum(nextWindow)) {
            increaseCount++;
        }
        else if (getSum(currentWindow) > getSum(nextWindow)) {
            decreaseCount++;
        }
    }

    cout << increaseCount << endl;
    return 0;
}
