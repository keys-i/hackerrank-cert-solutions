#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);


/*
 * Complete the 'minOperations' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY arr
 *  2. INTEGER threshold
 *  3. INTEGER d
 */

int minOperations(vector<int> arr, int threshold, int d) {
    int mx = 0;
    for (int x : arr) mx = max(mx, x);

    int maxOps = 0;
    for (int x = mx; x > 0; x /= d) ++maxOps;

    const int cols = maxOps + 1;
    vector<int> cnt((mx + 1) * cols, 0);

    for (int x : arr) {
        for (int ops = 0;; ++ops) {
            ++cnt[x * cols + ops];
            if (x == 0) break;
            x /= d;
        }
    }

    int ans = INT_MAX;

    for (int val = 0; val <= mx; ++val) {
        int need = threshold;
        int cost = 0;
        int base = val * cols;

        for (int ops = 0; ops <= maxOps && need > 0; ++ops) {
            int take = min(need, cnt[base + ops]);
            cost += take * ops;
            need -= take;
        }

        if (need == 0) ans = min(ans, cost);
    }

    return ans;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string arr_count_temp;
    getline(cin, arr_count_temp);

    int arr_count = stoi(ltrim(rtrim(arr_count_temp)));

    vector<int> arr(arr_count);

    for (int i = 0; i < arr_count; i++) {
        string arr_item_temp;
        getline(cin, arr_item_temp);

        int arr_item = stoi(ltrim(rtrim(arr_item_temp)));

        arr[i] = arr_item;
    }

    string threshold_temp;
    getline(cin, threshold_temp);

    int threshold = stoi(ltrim(rtrim(threshold_temp)));

    string d_temp;
    getline(cin, d_temp);

    int d = stoi(ltrim(rtrim(d_temp)));

    int result = minOperations(arr, threshold, d);

    fout << result << "\n";

    fout.close();

    return 0;
}

string ltrim(const string &str) {
    string s(str);

    s.erase(
        s.begin(),
        find_if(s.begin(), s.end(), not1(ptr_fun<int, int>(isspace)))
    );

    return s;
}

string rtrim(const string &str) {
    string s(str);

    s.erase(
        find_if(s.rbegin(), s.rend(), not1(ptr_fun<int, int>(isspace))).base(),
        s.end()
    );

    return s;
}

