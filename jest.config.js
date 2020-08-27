module.exports = {
  'verbose': true,
  'testPathIgnorePatterns': [
      '/node_modules/'
  ],
  'coveragePathIgnorePatterns': [
      '/node_modules/'
  ],
  'transformIgnorePatterns': [
      '/node_modules/(?!lodash-es).+\\.js$'
  ],
  'roots': [
      'src'
  ],
  'coverageThreshold': {
      'global': {
          'branches': 95,
          'functions': 95,
          'lines': 95,
          'statements': 95
      }
  },
  'moduleNameMapper': {
      '\\.(css|less)$': 'identity-obj-proxy'
  }
}
