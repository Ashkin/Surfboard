const path = require("path")
const express = require("express")

module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, "../index.html")
    const publicPath = express.static(path.join(__dirname, "..")) // ../public"))

    app.use(function(request, response, next) {
      // HTTPS? yay!
      if (request.secure)
        next()
      // Local? yay!
      if (request.headers.host.startsWith("localhost"))
        next()
      // Heroku-forwarded HTTPS? k..
      if (request.headers['x-forwarded-proto'].toLowerCase() == "https")
        next()

      // Insecure?  no no no.
      console.log("Insecure connection; redirecting to https")
      response.redirect("https://" + request.headers.host + request.url)
    })

    app.use("/", publicPath)
    app.get("/", function (_, res) { res.sendFile(indexPath) })

    return app
  }
}
