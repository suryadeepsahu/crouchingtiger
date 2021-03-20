README for using Grunt for development

###########################
  Adding files
###########################
    Note: If you add any library or 'vendor' javascript files, be sure to add them to
    the string array in grunt/files/js.js in the appropriate array. When running pre-loads the
    repo based on those files and NOT based on what's listed in script tags in 'index.html'


###########################
  Installing everything
###########################
    - If you have any of these skip that step
    - Install Nodejs at http://nodejs.org/download/
    - Run 'npm install' to get latest depencies listed in 'package.json'
    - Install the Grunt CLI with 'npm install -g grunt-cli'


###########################
        Grunt Usage
###########################
Running any of these will stay running in the terminal until you cancel out (Ctrl+C), and it will wait for you to make
file changes and re run itself on saving a file

    I recommend doing unitlint, but if you only want to use one at a time,
        use one of the bottom two.

    - Unit test/Lint process (Runs unit tests and js linter)
        'grunt unitlint --force'

    - Unit test (Runs only unit tester)
        'grunt unit --force'

    - Lint process (Runs only js linter)
        'grunt lint --force'


Common Errors and their solutions
    Problem -> "TypeError: Attempted to assign to readonly property."
    Solution -> in root directory of repo, go to karma.conf.js and switch
        browsers: ['PhantomJS'] to browsers: ['Firefox'],
        and run tests again. PhantomJS logs out bad errors some times and Firefox is usually exactly what
        the problem is. After resolving error, switch browsers property back to ['PhantomJS']



