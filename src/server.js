const path = require("path")
const express = require("express")

module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, "../index.html")
    const publicPath = express.static(path.join(__dirname, "..")) // ../public"))

    app.use(function(request, response, next) {
      console.log("New request")
      console.log(" | connection.encrypted: ", request.connection.encrypted)
      console.log(" | protocol: ", request.protocol)
      console.log(" | secure:   ", request.secure)

      // HTTPS? yay!
      if (request.secure)
        next()
      // Local? yay!
      if (request.headers.host.startsWith("localhost"))
        next()

      // no no no.
      console.log("Insecure connection; redirecting to https")
      response.redirect("https://" + request.headers.host + request.url)
    })

    app.use("/", publicPath)
    app.get("/", function (_, res) { res.sendFile(indexPath) })

    return app
  }
}
