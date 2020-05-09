module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
  },
  extends: [
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  // add your custom rules here
  rules: {
    "semi": [ "error", "always" ],
    "comma-dangle": [ "error", "always-multiline" ],
    "no-console": "off",
    "space-before-function-paren": [ "error", "never" ],
    "curly": "off",
  }
}
