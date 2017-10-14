const path = require("path")
const express = require("express")

module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, "../index.html")
    const publicPath = express.static(path.join(__dirname, "..")) // ../public"))

    app.use(function(request, response, next) {
      if (!request.secure  &&  !request.headers.host.startsWith("localhost")) {
        console.log("Insecure connection; redirecting to https")
        response.redirect("https://" + request.headers.host + request.url)
      } else next()
    })

    app.use("/", publicPath)
    app.get("/", function (_, res) { res.sendFile(indexPath) })

    return app
  }
}
