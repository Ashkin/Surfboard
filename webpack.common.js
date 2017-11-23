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
      ONBOARDING_KEY:   JSON.stringify(process.env.ONBOARDING_KEY),
      ONBOARDING_TOKEN: JSON.stringify(process.env.ONBOARDING_TOKEN),
      ORDERING_KEY:     JSON.stringify(process.env.ORDERING_KEY),
      ORDERING_TOKEN:   JSON.stringify(process.env.ORDERING_TOKEN),
      STRIPE_API_KEY:   JSON.stringify(process.env.STRIPE_API_KEY)
    })
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  }
}
