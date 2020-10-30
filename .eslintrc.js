module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "prettier"
    ],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
        'class-methods-use-this': 'off',
        'no-param-reassign': 'off'
    }
};
