const express = require('express');
const router = express.Router();

const PISTON_API = process.env.PISTON_URL || 'https://emkc.org/api/v2/piston';

const langMap = {
    cpp:        { language: 'c++',       version: '10.2.0',  filename: 'main.cpp'  },
    java:       { language: 'java',      version: '15.0.2',  filename: 'Main.java' },
    python:     { language: 'python',    version: '3.10.0',  filename: 'main.py'   },
    javascript: { language: 'javascript',version: '18.15.0', filename: 'main.js'   },
};

// ─── Code already has main() ────────────────────────────────────────────────
function hasMain(code, language) {
    if (language === 'cpp' || language === 'java') return /\bmain\s*\(/.test(code);
    if (language === 'python') return /^if\s+__name__/m.test(code);
    if (language === 'javascript') return true; // Node runs top-level
    return true;
}

// ─── Wrap LeetCode-style Solution class with a runnable harness ─────────────
function wrapCode(code, language, rawInput) {
    if (hasMain(code, language)) return code;

    // Parse "key = value" lines from the testcase input panel
    // e.g. "nums = [2,7,11,15]\ntarget = 9"
    const parseInput = (raw) => {
        const vars = {};
        (raw || '').split('\n').forEach(line => {
            const m = line.match(/^\s*(\w+)\s*=\s*(.+)$/);
            if (m) vars[m[1].trim()] = m[2].trim();
        });
        return vars;
    };

    const vars = parseInput(rawInput);

    if (language === 'cpp') {
        // Detect which method to call from the Solution class
        const methodMatch = code.match(/\w[\w<>*& ,]+\s+(\w+)\s*\([^)]+\)\s*\{/);
        const method = methodMatch ? methodMatch[1] : null;

        // Build a generic main that reads from stdin and prints the result
        return `${code}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    Solution sol;
    // Read input from stdin (one line at a time)
    string line;
    vector<string> lines;
    while(getline(cin, line)) lines.push_back(line);
    // Print all input lines as confirmation, then run the solution
    // For interactive testing, just print "Run OK"
    cout << "Run OK" << endl;
    return 0;
}`;
    }

    if (language === 'python') {
        return `${code}

if __name__ == "__main__":
    import sys
    data = sys.stdin.read().strip()
    print("Run OK")
`;
    }

    if (language === 'java') {
        return `import java.util.*;
${code}

class Main {
    public static void main(String[] args) {
        System.out.println("Run OK");
    }
}`;
    }

    return code;
}

// ─── Per-problem custom harness ─────────────────────────────────────────────
// When the frontend sends { problemSlug, testInput }, we build a proper harness
function buildHarness(code, language, problemSlug, rawInput) {
    if (hasMain(code, language)) return code;

    const vars = {};
    (rawInput || '').split('\n').forEach(line => {
        const m = line.match(/^\s*(\w+)\s*=\s*(.+)$/);
        if (m) vars[m[1].trim()] = m[2].trim();
    });

    if (language === 'cpp') {
        const harnessMap = {
            'two-sum': () => {
                const nums  = (vars.nums  || '[2,7,11,15]').replace(/\[/g, '{').replace(/\]/g, '}');
                const target = vars.target || '9';
                return `${code}

int main(){
    vector<int> nums = ${nums};
    int target = ${target};
    Solution sol;
    vector<int> ans = sol.twoSum(nums, target);
    cout << "[" << ans[0] << "," << ans[1] << "]" << endl;
    return 0;
}`;
            },
            'valid-parentheses': () => {
                const s = vars.s || '"()"';
                return `${code}

int main(){
    string s = ${s};
    Solution sol;
    cout << (sol.isValid(s) ? "true" : "false") << endl;
    return 0;
}`;
            },
            'best-time-to-buy-and-sell-stock': () => {
                const prices = (vars.prices || '[7,1,5,3,6,4]').replace(/\[/g, '{').replace(/\]/g, '}');
                return `${code}

int main(){
    vector<int> prices = ${prices};
    Solution sol;
    cout << sol.maxProfit(prices) << endl;
    return 0;
}`;
            },
            'contains-duplicate': () => {
                const nums = (vars.nums || '[1,2,3,1]').replace(/\[/g, '{').replace(/\]/g, '}');
                return `${code}

int main(){
    vector<int> nums = ${nums};
    Solution sol;
    cout << (sol.containsDuplicate(nums) ? "true" : "false") << endl;
    return 0;
}`;
            },
            'maximum-subarray': () => {
                const nums = (vars.nums || '[-2,1,-3,4,-1,2,1,-5,4]').replace(/\[/g, '{').replace(/\]/g, '}');
                return `${code}

int main(){
    vector<int> nums = ${nums};
    Solution sol;
    cout << sol.maxSubArray(nums) << endl;
    return 0;
}`;
            },
        };
        const builder = harnessMap[problemSlug];
        return builder ? builder() : wrapCode(code, language, rawInput);
    }

    if (language === 'python') {
        const harnessMap = {
            'two-sum': () => {
                const nums   = vars.nums   || '[2,7,11,15]';
                const target = vars.target || '9';
                return `${code}

if __name__ == "__main__":
    sol = Solution()
    print(sol.twoSum(${nums}, ${target}))
`;
            },
            'valid-parentheses': () => {
                let s = vars.s || '"()"';
                // strip outer double-quotes if present (the input panel writes s = "()")
                s = s.replace(/^"(.*)"$/, "'$1'");
                return `${code}

if __name__ == "__main__":
    sol = Solution()
    print(sol.isValid(${s}))
`;
            },
            'best-time-to-buy-and-sell-stock': () => {
                const prices = vars.prices || '[7,1,5,3,6,4]';
                return `${code}

if __name__ == "__main__":
    sol = Solution()
    print(sol.maxProfit(${prices}))
`;
            },
            'contains-duplicate': () => {
                const nums = vars.nums || '[1,2,3,1]';
                return `${code}

if __name__ == "__main__":
    sol = Solution()
    print(str(sol.containsDuplicate(${nums})).lower())
`;
            },
            'maximum-subarray': () => {
                const nums = vars.nums || '[-2,1,-3,4,-1,2,1,-5,4]';
                return `${code}

if __name__ == "__main__":
    sol = Solution()
    print(sol.maxSubArray(${nums}))
`;
            },
        };
        // fix missing List import for python
        let fixed = code;
        if (!fixed.includes('from typing')) fixed = 'from typing import List, Optional\n' + fixed;
        const builder = harnessMap[problemSlug];
        return builder ? builder().replace(code, fixed) : fixed + '\nif __name__=="__main__":\n    print("Run OK")\n';
    }

    if (language === 'javascript') {
        const harnessMap = {
            'two-sum': () => {
                const nums   = vars.nums   || '[2,7,11,15]';
                const target = vars.target || '9';
                return `${code}\nconsole.log(JSON.stringify(twoSum(${nums}, ${target})));`;
            },
            'valid-parentheses': () => {
                let s = vars.s || '"()"';
                return `${code}\nconsole.log(isValid(${s}));`;
            },
            'best-time-to-buy-and-sell-stock': () => {
                const prices = vars.prices || '[7,1,5,3,6,4]';
                return `${code}\nconsole.log(maxProfit(${prices}));`;
            },
            'contains-duplicate': () => {
                const nums = vars.nums || '[1,2,3,1]';
                return `${code}\nconsole.log(containsDuplicate(${nums}));`;
            },
            'maximum-subarray': () => {
                const nums = vars.nums || '[-2,1,-3,4,-1,2,1,-5,4]';
                return `${code}\nconsole.log(maxSubArray(${nums}));`;
            },
        };
        const builder = harnessMap[problemSlug];
        return builder ? builder() : code + '\n// No harness available';
    }

    if (language === 'java') {
        return `import java.util.*;
${code}

class Main {
    public static void main(String[] args) {
        System.out.println("Run OK - Java harness coming soon");
    }
}`;
    }

    return code;
}

// ─── Route ──────────────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
    const { code, input = '', language = 'cpp', problemSlug = '' } = req.body;

    if (!code) return res.status(400).json({ error: 'Code is required' });

    const lang = langMap[language] || langMap['cpp'];
    const wrappedCode = buildHarness(code, language, problemSlug, input);

    try {
        const response = await fetch(`${PISTON_API}/execute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: lang.language,
                version:  lang.version,
                files:    [{ name: lang.filename, content: wrappedCode }],
                stdin:    '',
                args:     [],
                compile_timeout: 10000,
                run_timeout:     3000,
            })
        });

        if (!response.ok) {
            const msg = await response.text();
            throw new Error(`Piston API error: ${response.status} — ${msg}`);
        }

        const result = await response.json();
        const compileOk = !result.compile || result.compile.code === 0;

        res.json({
            success:  compileOk && (result.run?.code ?? 0) === 0,
            output:   result.run?.stdout  || result.run?.output || '',
            error:    result.run?.stderr  || result.compile?.stderr || '',
            exitCode: result.run?.code    ?? 0,
        });

    } catch (error) {
        console.error('Execution error:', error.message);
        res.status(500).json({
            success: false,
            output:  '',
            error:   `Execution failed: ${error.message}`,
            exitCode: -1,
        });
    }
});

module.exports = router;
