module.exports = {
  'presets': [
      '@babel/preset-react',
      [
          '@babel/preset-env',
          {
              'targets': {
                  'node': 'current'
              }
          }
      ]
  ],
  'plugins': [
      [
          '@babel/plugin-proposal-decorators',
          {
              'legacy': true
          }
      ],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-json-strings'
  ]
}
