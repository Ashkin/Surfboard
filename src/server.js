const path = require("path")
const express = require("express")

module.exports = {
    app: function () {
        const app = express()
        const indexPath  = path.join(__dirname, "../index.html")
        const bundlePath = path.join(__dirname, "../bundle.js")
        const publicPath = path.join(__dirname, "../public")


        app.use(function(request, response, next) {
            // HTTPS? yay!
            if (request.secure)
                return next()
            // Local? yay!
            if (request.headers.host.startsWith("localhost"))
                return next()
            // Heroku-forwarded HTTPS? k..
            if (request.headers['x-forwarded-proto'].toLowerCase() == "https")
                return next()

            // Insecure?  no no no.
            console.log("Insecure connection; redirecting to https")
            response.redirect("https://" + request.headers.host + request.url)
        })

        // app.use("/", publicPath)
        // app.get("/", function(_, res) { res.sendFile(indexPath) })


        //TODO: This should handle all public assets.
        // Serve bundle.js by itself
        app.get("/bundle.js",          function(_, res) { res.sendFile(bundlePath) })
        app.get("/public/favicon.png", function(_, res) { res.sendFile(path.join(publicPath, "/favicon.png")) })  //TODO: cleanup


        // All other routes:
        app.get("*", function(request, response) {
            // Strip ":port" from host, if present
            host = request.headers.host.split(":")[0]

            // Send host and url cookie
            response.cookie("host",  host)
            response.cookie("requested_url",  request.url)

            // Render the root path
            response.sendFile(indexPath)
        })

        return app
    }
}
