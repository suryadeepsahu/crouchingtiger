module.exports = {
    //js: {
    //    files: ["<%= files.js.src %>", "<%= files.js.vendor %>"],
    //    tasks: ["concat:js"]
    //},

    js_source: {
        files: ["<%= files.js.src %>"],
        tasks: ["concat:js_src"]
    },
    js_vendor: {
        files: ["<%= files.js.vendor %>"],
        tasks: ["concat:js_vendor"]
    },

    less: {
        files: ["<%= files.less.src %>"],
        tasks: ["less"]
    },
    css: {
        files: ["<%= files.css.src %>"],
        tasks: ["concat:css"]
    },

    hint: {
        files: [
            "<%= files.js.src %>",
            "<%= files.js.grunt_stuff %>"
        ],
        tasks: ["clear", "jshint"]
    },

    unitlint: {
        files: [
            "<%= files.js.src %>",
            "<%= files.js.grunt_stuff %>",
            "tests/**/*.js"
        ],
        tasks: ["clear", "karma:unit", "jshint"]
    },

    unit: {
        files: [
            "<%= files.js.src %>",
            "<%= files.js.grunt_stuff %>",
            "tests/**/*.js"
        ],
        tasks: ["clear","karma"]
    }


};