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
  {
    id: 6,
    slug: 'find-the-highest-altitude',
    title: 'Find the Highest Altitude',
    difficulty: 'Easy',
    category: 'Arrays',
    tags: ['Array', 'Prefix Sum'],
    acceptance: '82.8%',
    description: `There is a biker going on a road trip. The road trip consists of \`n + 1\` points at different altitudes. The biker starts his trip on point \`0\` with altitude equal \`0\`.

You are given an integer array \`gain\` of length \`n\` where \`gain[i]\` is the net gain in altitude between points \`i\` and \`i + 1\` for all (\`0 <= i < n\`). Return the **highest altitude** of a point.`,
    examples: [
      { input: 'gain = [-5,1,5,0,-7]', output: '1', explanation: 'The altitudes are [0,-5,-4,1,1,-6]. The highest is 1.' },
      { input: 'gain = [-4,-3,-2,-1,4,3,2]', output: '0', explanation: 'The altitudes are [0,-4,-7,-9,-10,-6,-3,-1]. The highest is 0.' },
    ],
    constraints: [
      'n == gain.length',
      '1 <= n <= 100',
      '-100 <= gain[i] <= 100',
    ],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int largestAltitude(vector<int>& gain) {
        // Write your solution here
        
    }
};`,
      java: `class Solution {
    public int largestAltitude(int[] gain) {
        // Write your solution here
        
    }
}`,
      python: `class Solution:
    def largestAltitude(self, gain: List[int]) -> int:
        # Write your solution here
        pass`,
      javascript: `/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function(gain) {
    // Write your solution here
    
};`,
    },
    testcases: [
      { input: 'gain = [-5,1,5,0,-7]', expectedOutput: '1' },
      { input: 'gain = [-4,-3,-2,-1,4,3,2]', expectedOutput: '0' },
    ],
    hiddenTests: [
      { input: 'gain = [10,-5,20,-15]', expectedOutput: '25' },
      { input: 'gain = [-1,-2,-3]', expectedOutput: '0' },
    ],
    hints: [
      { type: 'Nudge', content: 'What is the altitude at the very beginning?' },
      { type: 'Clue', content: 'The altitude at point 0 is 0. The altitude at point 1 is gain[0]. The altitude at point 2 is gain[0] + gain[1].' },
      { type: 'Strategy', content: 'Keep a running sum of the gains. The current altitude is the running sum. Keep track of the maximum altitude seen so far (starting with 0).' },
    ],
  },
  {
    id: 7,
    slug: 'palindrome-number',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    category: 'Math',
    tags: ['Math'],
    acceptance: '53.8%',
    description: `Given an integer \`x\`, return \`true\` if \`x\` is a **palindrome**, and \`false\` otherwise.`,
    examples: [
      { input: 'x = 121', output: 'true', explanation: '121 reads as 121 from left to right and from right to left.' },
      { input: 'x = -121', output: 'false', explanation: 'From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.' },
      { input: 'x = 10', output: 'false', explanation: 'Reads 01 from right to left. Therefore it is not a palindrome.' },
    ],
    constraints: [
      '-2³¹ <= x <= 2³¹ - 1'
    ],
    starterCode: {
      cpp: `#include <iostream>
using namespace std;

class Solution {
public:
    bool isPalindrome(int x) {
        // Write your solution here
        
    }
};`,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        // Write your solution here
        
    }
}`,
      python: `class Solution:
    def isPalindrome(self, x: int) -> bool:
        # Write your solution here
        pass`,
      javascript: `/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    // Write your solution here
    
};`,
    },
    testcases: [
      { input: 'x = 121', expectedOutput: 'true' },
      { input: 'x = -121', expectedOutput: 'false' },
      { input: 'x = 10', expectedOutput: 'false' },
    ],
    hiddenTests: [
      { input: 'x = 12321', expectedOutput: 'true' },
      { input: 'x = 123', expectedOutput: 'false' },
      { input: 'x = 0', expectedOutput: 'true' },
    ],
    hints: [
      { type: 'Nudge', content: 'What happens to negative numbers?' },
      { type: 'Clue', content: 'If you convert the number to a string, you can check if the string equals its reverse.' },
      { type: 'Strategy', content: 'For a math-only approach, you can reverse the second half of the number and check if it matches the first half.' },
    ],
  },
  {
    id: 8,
    slug: 'roman-to-integer',
    title: 'Roman to Integer',
    difficulty: 'Easy',
    category: 'Strings',
    tags: ['Hash Table', 'Math', 'String'],
    acceptance: '58.4%',
    description: `Roman numerals are represented by seven different symbols: \`I\`, \`V\`, \`X\`, \`L\`, \`C\`, \`D\` and \`M\`.

For example, \`2\` is written as \`II\` in Roman numeral, just two ones added together. \`12\` is written as \`XII\`, which is simply \`X + II\`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not \`IIII\`. Instead, the number four is written as \`IV\`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as \`IX\`. There are six instances where subtraction is used:
- \`I\` can be placed before \`V\` (5) and \`X\` (10) to make 4 and 9. 
- \`X\` can be placed before \`L\` (50) and \`C\` (100) to make 40 and 90. 
- \`C\` can be placed before \`D\` (500) and \`M\` (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer.`,
    examples: [
      { input: 's = "III"', output: '3', explanation: 'III = 3.' },
      { input: 's = "LVIII"', output: '58', explanation: 'L = 50, V= 5, III = 3.' },
      { input: 's = "MCMXCIV"', output: '1994', explanation: 'M = 1000, CM = 900, XC = 90 and IV = 4.' },
    ],
    constraints: [
      '1 <= s.length <= 15',
      's contains only the characters (\'I\', \'V\', \'X\', \'L\', \'C\', \'D\', \'M\').',
      'It is guaranteed that s is a valid roman numeral in the range [1, 3999].'
    ],
    starterCode: {
      cpp: `#include <iostream>
#include <string>
using namespace std;

class Solution {
public:
    int romanToInt(string s) {
        // Write your solution here
        
    }
};`,
      java: `class Solution {
    public int romanToInt(String s) {
        // Write your solution here
        
    }
}`,
      python: `class Solution:
    def romanToInt(self, s: str) -> int:
        # Write your solution here
        pass`,
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    // Write your solution here
    
};`,
    },
    testcases: [
      { input: 's = "III"', expectedOutput: '3' },
      { input: 's = "LVIII"', expectedOutput: '58' },
      { input: 's = "MCMXCIV"', expectedOutput: '1994' },
    ],
    hiddenTests: [
      { input: 's = "IX"', expectedOutput: '9' },
      { input: 's = "XL"', expectedOutput: '40' },
      { input: 's = "MCDLXXVI"', expectedOutput: '1476' },
    ],
    hints: [
      { type: 'Nudge', content: 'What is the integer value for each roman character? A hash map can help map characters to values.' },
      { type: 'Clue', content: 'Iterate from left to right. If the current character is smaller than the next one, you need to subtract it.' },
      { type: 'Strategy', content: 'Keep a running total. For each character, check if the value of the current character is less than the value of the next character. If so, subtract its value. Otherwise, add its value.' },
    ],
  },
  {
    id: 9,
    slug: 'search-insert-position',
    title: 'Search Insert Position',
    difficulty: 'Easy',
    category: 'Arrays',
    tags: ['Array', 'Binary Search'],
    acceptance: '43.7%',
    description: `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      { input: 'nums = [1,3,5,6], target = 5', output: '2' },
      { input: 'nums = [1,3,5,6], target = 2', output: '1' },
      { input: 'nums = [1,3,5,6], target = 7', output: '4' },
    ],
    constraints: [
      '1 <= nums.length <= 10⁴',
      '-10⁴ <= nums[i] <= 10⁴',
      'nums contains distinct values sorted in ascending order.',
      '-10⁴ <= target <= 10⁴'
    ],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        // Write your solution here
        
    }
};`,
      java: `class Solution {
    public int searchInsert(int[] nums, int target) {
        // Write your solution here
        
    }
}`,
      python: `class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        # Write your solution here
        pass`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    // Write your solution here
    
};`,
    },
    testcases: [
      { input: 'nums = [1,3,5,6]\ntarget = 5', expectedOutput: '2' },
      { input: 'nums = [1,3,5,6]\ntarget = 2', expectedOutput: '1' },
      { input: 'nums = [1,3,5,6]\ntarget = 7', expectedOutput: '4' },
    ],
    hiddenTests: [
      { input: 'nums = [1]\ntarget = 0', expectedOutput: '0' },
      { input: 'nums = [1,3,5,6]\ntarget = 0', expectedOutput: '0' },
    ],
    hints: [
      { type: 'Nudge', content: 'Since the array is sorted, do we need to check every element? O(log n) requires binary search.' },
      { type: 'Clue', content: 'Set low = 0 and high = len(nums) - 1. Find the mid point.' },
      { type: 'Strategy', content: 'If nums[mid] == target, return mid. If nums[mid] < target, low = mid + 1. Else high = mid - 1. When the loop ends, return low.' },
    ],
  },
  {
    id: 10,
    slug: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    category: 'DP',
    tags: ['Math', 'Dynamic Programming', 'Memoization'],
    acceptance: '52.2%',
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: 'n = 2', output: '2', explanation: 'There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps' },
      { input: 'n = 3', output: '3', explanation: 'There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step' },
    ],
    constraints: [
      '1 <= n <= 45'
    ],
    starterCode: {
      cpp: `#include <iostream>
using namespace std;

class Solution {
public:
    int climbStairs(int n) {
        // Write your solution here
        
    }
};`,
      java: `class Solution {
    public int climbStairs(int n) {
        // Write your solution here
        
    }
}`,
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        # Write your solution here
        pass`,
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    // Write your solution here
    
};`,
    },
    testcases: [
      { input: 'n = 2', expectedOutput: '2' },
      { input: 'n = 3', expectedOutput: '3' },
      { input: 'n = 4', expectedOutput: '5' },
    ],
    hiddenTests: [
      { input: 'n = 5', expectedOutput: '8' },
      { input: 'n = 10', expectedOutput: '89' },
    ],
    hints: [
      { type: 'Nudge', content: 'To reach step n, you could have come from step n-1 or step n-2.' },
      { type: 'Clue', content: 'This means ways(n) = ways(n-1) + ways(n-2). This is exactly the Fibonacci sequence!' },
      { type: 'Strategy', content: 'You can use an array to store the number of ways for each step, or just two variables to keep track of the previous two steps to save space.' },
    ],
  },
];

export const getProblemBySlug = (slug) => problems.find(p => p.slug === slug);
export const getProblemById = (id) => problems.find(p => p.id === Number(id));
