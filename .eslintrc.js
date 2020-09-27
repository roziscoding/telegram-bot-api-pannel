module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:vue/essential', 'standard'],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-unused-vars': 'off',
    'space-before-function-paren': 'off',
    'vue/no-template-key': 'off',
    'vue/require-v-for-key': 'off',
    'vue/valid-template-root': 'off'
  }
}
