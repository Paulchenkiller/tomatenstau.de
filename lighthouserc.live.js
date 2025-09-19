module.exports = {
  ci: {
    collect: {
      url: [
        'https://tomatenstau.de',
        'https://tomatenstau.de/code',
        'https://tomatenstau.de/code/javascript',
      ],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.8 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-reports-live',
    },
  },
};
