const withPlugins = require('next-compose-plugins')
const withStyledIcons = require('next-plugin-styled-icons')

const nextConfig = {}

module.exports = withPlugins([withStyledIcons], nextConfig)
