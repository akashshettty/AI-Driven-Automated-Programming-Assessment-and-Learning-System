// ─── Problem Schema ───────────────────────────────────────────────────────────
// Each problem: { id, slug, title, difficulty, category, tags, acceptance,
//   description, examples, constraints,
//   starterCode: { cpp, java, python, javascript },
//   testcases, hiddenTests, hints }
// ─────────────────────────────────────────────────────────────────────────────

export const problems = [
  {
    id: 1,
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    tags: ['Array', 'Hash Table'],
    acceptance: '49.2%',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return **indices** of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' },
    ],
    constraints: [
      '2 <= nums.length <= 10⁴',
      '-10⁹ <= nums[i] <= 10⁹',
      '-10⁹ <= target <= 10⁹',
      'Only one valid answer exists.',
    ],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
    }
}`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your solution here
        pass`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your solution here
    
};`,
    },
    testcases: [
      { input: 'nums = [2,7,11,15]\ntarget = 9', expectedOutput: '[0,1]' },
      { input: 'nums = [3,2,4]\ntarget = 6', expectedOutput: '[1,2]' },
      { input: 'nums = [3,3]\ntarget = 6', expectedOutput: '[0,1]' },
    ],
    hiddenTests: [
      { input: 'nums = [1,5,3,2]\ntarget = 4', expectedOutput: '[0,2]' },
      { input: 'nums = [0,4,3,0]\ntarget = 0', expectedOutput: '[0,3]' },
    ],
    hints: [
      { type: 'Nudge', content: 'Try brute force first: check every pair of numbers. What is the time complexity of that approach?' },
      { type: 'Clue', content: 'Can you reduce the time from O(n²) to O(n)? Think about a data structure that gives O(1) lookups.' },
      { type: 'Strategy', content: 'Use a hash map. For each number, check if (target - number) already exists in the map. If yes, you found your pair. If no, store the current number in the map and continue.' },
    ],
  },
  {
    id: 2,
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    tags: ['String', 'Stack'],
    acceptance: '40.8%',
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is **valid**.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    constraints: [
      '1 <= s.length <= 10⁴',
      's consists of parentheses only \'()[]{}\''
    ],
    starterCode: {
      cpp: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        // Write your solution here
        
    }
};`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        
    }
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        # Write your solution here
        pass`,
      javascript: `var isValid = function(s) {
    // Write your solution here
    
};`,
    },
    testcases: [
      { input: 's = "()"', expectedOutput: 'true' },
      { input: 's = "()[]{}"', expectedOutput: 'true' },
      { input: 's = "(]"', expectedOutput: 'false' },
    ],
    hiddenTests: [
      { input: 's = "([)]"', expectedOutput: 'false' },
      { input: 's = "{[]}"', expectedOutput: 'true' },
    ],
    hints: [
      { type: 'Nudge', content: 'Think about what happens when you see an opening bracket vs a closing bracket.' },
      { type: 'Clue', content: 'A stack data structure follows LIFO — perfect for matching the most recent opening bracket.' },
      { type: 'Strategy', content: 'Push every opening bracket onto a stack. When you see a closing bracket, check if the top of the stack is the matching opener. If not, return false. At the end, the stack should be empty.' },
    ],
  },
  {
    id: 3,
    slug: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Arrays',
    tags: ['Array', 'Dynamic Programming'],
    acceptance: '54.3%',
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the i-th day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return the *maximum profit* you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.`,
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'No profit is possible, return 0.' },
    ],
    constraints: [
      '1 <= prices.length <= 10⁵',
      '0 <= prices[i] <= 10⁴',
    ],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Write your solution here
        
    }
};`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        // Write your solution here
        
    }
}`,
      python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # Write your solution here
        pass`,
      javascript: `var maxProfit = function(prices) {
    // Write your solution here
    
};`,
    },
    testcases: [
      { input: 'prices = [7,1,5,3,6,4]', expectedOutput: '5' },
      { input: 'prices = [7,6,4,3,1]', expectedOutput: '0' },
    ],
    hiddenTests: [
      { input: 'prices = [1,2]', expectedOutput: '1' },
      { input: 'prices = [2,4,1]', expectedOutput: '2' },
    ],
    hints: [
      { type: 'Nudge', content: 'You need to buy before you sell. Can you think of a single-pass solution?' },
      { type: 'Clue', content: 'Track the minimum price seen so far. For each day, the maximum profit if you sell today is price[today] - minPrice.' },
      { type: 'Strategy', content: 'Slide a window: maintain minPrice and maxProfit. For each price, update minPrice = min(minPrice, price), then maxProfit = max(maxProfit, price - minPrice). Return maxProfit.' },
    ],
  },
  {
    id: 4,
    slug: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    category: 'HashMap',
    tags: ['Array', 'Hash Table', 'Sorting'],
    acceptance: '61.3%',
    description: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.`,
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true' },
      { input: 'nums = [1,2,3,4]', output: 'false' },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', output: 'true' },
    ],
    constraints: [
      '1 <= nums.length <= 10⁵',
      '-10⁹ <= nums[i] <= 10⁹',
    ],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        // Write your solution here
        
    }
};`,
      java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        // Write your solution here
        
    }
}`,
      python: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        # Write your solution here
        pass`,
      javascript: `var containsDuplicate = function(nums) {
    // Write your solution here
    
};`,
    },
    testcases: [
      { input: 'nums = [1,2,3,1]', expectedOutput: 'true' },
      { input: 'nums = [1,2,3,4]', expectedOutput: 'false' },
    ],
    hiddenTests: [
      { input: 'nums = [1,1,1,3,3,4]', expectedOutput: 'true' },
      { input: 'nums = [1]', expectedOutput: 'false' },
    ],
    hints: [
      { type: 'Nudge', content: 'Brute force compares every pair — O(n²). Can you do better?' },
      { type: 'Clue', content: 'A HashSet stores unique values. Inserting a duplicate fails.' },
      { type: 'Strategy', content: 'Iterate through nums. For each number, check if it already exists in your set. If yes, return true. Otherwise add it to the set. If you finish the loop, return false.' },
    ],
  },
  {
    id: 5,
    slug: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    category: 'DP',
    tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
    acceptance: '50.1%',
    description: `Given an integer array \`nums\`, find the **subarray** with the largest sum, and return *its sum*.`,
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [5,4,-1,7,8]', output: '23' },
    ],
    constraints: [
      '1 <= nums.length <= 10⁵',
      '-10⁴ <= nums[i] <= 10⁴',
    ],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Write your solution here
        
    }
};`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your solution here
        
    }
}`,
      python: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        # Write your solution here
        pass`,
      javascript: `var maxSubArray = function(nums) {
    // Write your solution here
    
};`,
    },
    testcases: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6' },
      { input: 'nums = [1]', expectedOutput: '1' },
      { input: 'nums = [5,4,-1,7,8]', expectedOutput: '23' },
    ],
    hiddenTests: [
      { input: 'nums = [-1]', expectedOutput: '-1' },
      { input: 'nums = [-2,-1]', expectedOutput: '-1' },
    ],
    hints: [
      { type: 'Nudge', content: 'Think about Kadane\'s Algorithm. At each position, should you extend the current subarray or start a fresh one?' },
      { type: 'Clue', content: 'If the current running sum becomes negative, it can only hurt future subarrays. Reset it to 0.' },
      { type: 'Strategy', content: 'Keep currentSum and maxSum. For each number: currentSum = max(num, currentSum + num). maxSum = max(maxSum, currentSum). This is O(n) time, O(1) space.' },
    ],
  },
];

export const getProblemBySlug = (slug) => problems.find(p => p.slug === slug);
export const getProblemById = (id) => problems.find(p => p.id === Number(id));
