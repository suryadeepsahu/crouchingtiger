module.exports = function(grunt) {
    var express = require("express");
    grunt.registerTask("server", "static file development server", function() {
        var app, webPort, webRoot;
        //|| grunt.config.get("server.web.port")
        webPort = 8080 ;
        // || "dist"
        webRoot = "generated";
        grunt.log.writeln("webPort")
        grunt.log.writeln(webPort)
        grunt.log.writeln("webRoot")
        grunt.log.writeln(webRoot)

        app = express();
        app.use(express.static("" + (process.cwd()) + "/" + webRoot));
        app.listen(webPort);

        grunt.log.writeln("Starting express web server in \"" + webRoot + "\" on port " + webPort);

        return app;
    });
};
