module.exports = {
    htmlangular: {
        options: {
            customtags: [
                'dc-chart'
            ],
            customattrs: [
                "sparklines",
                "dropdown",
                "flotchart",
                "date-begin",
                "daterangepicker"
            ],
            relaxerror: [
                'The frameborder attribute on the iframe element is obsolete. Use CSS instead.'
            ],
            reportpath: 'target/html-angular-validate-report.json'
        },
        files: {
            src: ['views/**/*.html', "index.html"]
        }
    }
};