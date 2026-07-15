module.exports = {
    coverageDirectory: 'tests/coverage',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/Examples/',
    ],
    projects: [
        {
            displayName: 'unit',
            testMatch: ['<rootDir>/tests/unit/**/*.test.js'],
        },
        {
            displayName: 'integration',
            testMatch: ['<rootDir>/tests/*.test.js'],
        },
    ],
};
