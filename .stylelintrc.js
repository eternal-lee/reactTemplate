module.exports = {
    extends: [
      'stylelint-config-standard',
      'stylelint-config-recess-order',
      'stylelint-config-prettier'
    ],
    rules: {
      'declaration-colon-space-after': 'always-single-line',
      'declaration-colon-space-before': 'never',
      'font-family-no-missing-generic-family-keyword': null,
      'no-descending-specificity': null,
      'rule-empty-line-before': [
        'always',
        {
          ignore: ['after-comment', 'first-nested']
        }
      ]
    }
  }
  