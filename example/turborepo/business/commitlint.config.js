// eslint-disable-next-line no-undef
module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'revert',
        'chore',
        'perf',
      ],
    ],
  },
}
