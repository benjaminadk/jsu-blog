const withPlugins = require('next-compose-plugins')
const withStyledIcons = require('next-plugin-styled-icons')

const nextConfig = {
  webpack: function(config) {
    config.module.rules = config.module.rules.map(rule => {
      if (rule.use.loader && rule.use.loader === 'next-babel-loader') {
        rule.use.options.cacheDirectory = false
      }
      return rule
    })
    return config
  }
}

module.exports = withStyledIcons()
