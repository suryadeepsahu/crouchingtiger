module.exports = function(config)
{
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '',

        //frameworks to use (could utilize require here as well)
        frameworks: ['jasmine-jquery','jasmine'],

        plugins: ['karma-*','elizabot.*','gridster.*'],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage', 'spec', 'mochas'
        //reporters: ["nyan"],
        reporters: ["spec"],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR | config.

        logLevel: config.LOG_INFO,

        // use this one for debugging... obviously.
        //logLevel: config.LOG_DEBUG,

        // enable / disable watching file and executing tests whenever any files
        autoWatch: false,

        browsers: ['PhantomJS'],

        // use Firefox for debugging purposes since PhantomJS sucks
        //browsers: ['Firefox'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        // change the singleRun value to false if you want to DEBUG in the console
        // singleRun: false,
		singleRun: true,
        // coverage reporter generates the coverage

        preprocessors: {
         // source files, that you wanna generate coverage for
         // do not include tests or libraries
         // (these files will be instrumented by Istanbul)
         'scripts/**/*.js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
          type : 'html',
          dir  : 'coverage/'
        }


    });
};
