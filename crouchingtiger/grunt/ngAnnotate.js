module.exports = {
    options: {
        singleQuotes: true
    },
    prod: {
        files: {
            "generated/js/lib.min.js":"generated/js/lib.min.js",
            "generated/js/app.min.js":"generated/js/app.min.js"
        }
    }
};