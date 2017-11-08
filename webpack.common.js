webpack = require('webpack')

module.exports = {
  entry: [
    './src/index.js'
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV:         JSON.stringify(process.env.NODE_ENV),
      APPLICATION_KEY:  JSON.stringify(process.env.APPLICATION_KEY),
      WWW_ACCESS_TOKEN: JSON.stringify(process.env.WWW_ACCESS_TOKEN),
      STRIPE_API_KEY:   JSON.stringify(process.env.STRIPE_API_KEY)
    })
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  }
}
