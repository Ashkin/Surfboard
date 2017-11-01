const path = require("path")
const express = require("express")

module.exports = {
    app: function () {
        const app = express()
        const indexPath  = path.join(__dirname, "../index.html")
        const bundlePath = path.join(__dirname, "../bundle.js")
        const publicPath = express.static(path.join(__dirname, "..")) // ../public"))

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
        app.get("/bundle.js", function(_, res) { res.sendFile(bundlePath) })

        // All other routes:
        app.get("*", function(request, response) {
            // Send host and url cookie
            response.cookie("host",  request.headers.host)
            response.cookie("requested_url",  request.url)

            // Render the root path
            response.sendFile(indexPath)
        })

        return app
    }
}
