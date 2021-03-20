module.exports = {
    js_src: {
        files: {
            // source files
            "generated/js/app.min.js": ["<%= files.js.src %>"]
        }
    },
    js_vendor: {
        files: {
            // library files
            "generated/js/lib.min.js": ["<%= files.js.vendor %>"]
        }
    },

    css: {
        files: {
            // source CSS files
            "generated/css/app.min.css": [
                "<%= files.less.delessified %>",
                "<%= files.css.src %>"
            ],

            // library CSS files
            "generated/css/lib.min.css": [
                "<%= files.less.src %>",
                "<%= files.css.vendor %>"
            ]
        }
    }
};