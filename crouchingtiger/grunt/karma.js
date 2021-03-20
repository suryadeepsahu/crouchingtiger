module.exports = {
    options: {
        configFile: "karma.conf.js"
    },
    unit: {
        files:{
            src: [
                "bower_components/jquery/dist/jquery.min.js",
                "<%= files.js.vendor %>",
                "<%= files.js.src %>",
                "<%= files.js.tests %>"
            ]
        },
        background: false
    }
};