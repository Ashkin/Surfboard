const webpack       = require("webpack")
let   webpackConfig = null

const Server  = require("./server.js")
const port    = (process.env.PORT || 8080)
const app     = Server.app()




console.log("------------ [Building App] ------------")
console.log("[Info]  Environment: " + process.env.NODE_ENV + "\n")

// Environment-specific building
switch(process.env.NODE_ENV.toLowerCase()) {
case "production":
case "staging":
  // Compile
  webpackConfig = require("../webpack.prod.js")
  webpack(webpackConfig, postCompile)
  break;

case "development":
  // Compile
  webpackConfig = require("../webpack.dev.js")
  const compiler = webpack(webpackConfig, postCompile)
  // Inject middleware
  const webpackDevMiddleware = require("webpack-dev-middleware")
  const webpackHotMiddleware = require("webpack-hot-middleware")
  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))
  break;

default:
  console.error(`Error: Unknown NODE_ENV (${process.env.NODE_ENV})`)
  console.error("Exiting")
}



function postCompile(err, stats) {
  if (err) {
    console.error(err)
    return
  }

  // json errors and warnings
  jsonStats = stats.toJson()
  if (jsonStats.errors.length > 0) {
    jsonStats.errors.forEach(function(err) { console.error(err); })
    return
  }

  if (jsonStats.warnings.length > 0) {
    jsonStats.warnings.forEach(function(warning) { console.warn(warning); })
  }

  serveApp()
}


function serveApp() {
  console.log("------------ [Serving App] ------------")
  app.listen(port)
  console.log(`Listening at http(s)://localhost:${port}\n\n`)
}
