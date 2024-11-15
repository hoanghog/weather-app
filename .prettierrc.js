module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  arrowParens: 'avoid',
  parser: 'typescript',
  endOfLine: 'crlf',
  printWidth: 140,
  overrides: [
    {
      files: '*.json',
      options: {
        tabWidth: 2,
        parser: 'json'
      }
    }
  ]
};
