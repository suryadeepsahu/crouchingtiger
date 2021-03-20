module.exports = {

    files: [
        'Gruntfile.js',
        "scripts/**/*.js",
        "tests/**/*.js"
    ],

    options: {
        reporter: require('jshint-stylish'),
        laxbreak: true,
        loopfunc: true,
        globals: {
            'jQuery':      true,
            'angular':     false,
            '_':           false,
            '$':           false,
            'setTimeout':  false,
            'alert':       false,
            'document':    false,
            'PNotify':     false,
            'window':      false,
            'd3':          false,
            'ToolBox':     false,
            'crossfilter': false,
            'CallFlow':    false,
            'Model':       false,
            'console':     false,
            'gridster':    false,
            'idIndex':     false,
            'jsPDF':         true
        }
    }
};