module.exports = {
    parserOptions: {
        sourceType: "module"
    },
    parser: "babel-eslint",
    env: {
        node: true
    },
    extends: [
        "standard",
        "prettier",
        "prettier/standard",
        "plugin:jest/recommended",
        "plugin:react/recommended"
    ],
    plugins: ["prettier", "jest"],
    rules: {
        "promise/catch-or-return": "error",
        "react/prop-types": 0
    }
}
