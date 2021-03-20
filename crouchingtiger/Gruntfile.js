



module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	var lessCreateConfig = function (context, block) {
		var path = require("path");
		var cfg = {files: []},
			outfile = path.join(context.outDir, block.dest),
			filesDef = {};

		filesDef.dest = outfile;
		filesDef.src = [];

		context.inFiles.forEach(function (inFile) {
			filesDef.src.push(path.join(context.inDir, inFile));
		});

		cfg.files.push(filesDef);
		context.outFiles = [block.dest];
		return cfg;
	};


	grunt.config.init({


		useminPrepare: {
			html: 'index.php',
			options: {
				dest: 'dist',
				steps: {
					// js: ["concat", "uglify"],
					// css: ["concat", "cssmin"],
					less: [{
						name: "less",
						createConfig: lessCreateConfig
					}]
				},
				post: {}
			}
		},
		usemin: {
			html: ['dist/index.php'],
			options: {
				blockReplacements: {
					less: function (block) {
						return '<link rel="stylesheet" href="' + block.dest + '" />';
					}
				}
			}
		},
		copy: {
			html: {
				src: './index.php', dest: 'dist/index.php'
			},
			htmlViews: {
				files: [
					{expand: true, src: ['views/**'], dest: 'dist/'},
				]
			},
			css: {
				files: [
					{
						expand: true,
						src: ['**'],
						dest: '.tmp/concat/assets/css/',
						cwd: "assets/plugins/icheck/"
					}
				]
			},
			misc: {
				files: [
					{
						expand: true,
						src: ["favicon.ico", "favicon.png", "img/**", "assets/**", "js/widget_embed_library_192_ours.js", "bower_components/moment-timezone/data/packed/latest.json"],
						dest: 'dist/'
					},
					{
						expand: true,
						flatten:true,
						src: ["assets/plugins/icheck/minimal/blue.png"],
						dest: 'dist/assets/css/'
					},
					{
						expand: true,
						flatten:true,
						src: ["assets/plugins/icheck/minimal/blue@2x.png"],
						dest: 'dist/assets/css/'
					}
				]
			}

		},

		less: {
			production: {
				files: {
					".tmp/compiled_less/assets/less/compiled_styles.css": "assets/less/styles.less"
				}
			}
		},
		cssmin: {
			target: {
				files: {
					"dist/assets/css/compiled_styles.css": [".tmp/compiled_less/assets/less/compiled_styles.css"]
				}
			},
			afterall:{
				files: {
					"dist/assets/css/compiled_styles.css": ["dist/assets/css/compiled_styles.css"],
					"dist/assets/css/vendor.css": ["dist/assets/css/vendor.css"]

				}
			}
		},
		ngAnnotate: {
			options: {
				add: true
			},
			hardGenerated: {
				files: {
					".tmp/concat/js/app.js":     [".tmp/concat/js/app.js"],
					".tmp/concat/js/vendor1.js": [".tmp/concat/js/vendor1.js"],
					".tmp/concat/js/vendor2.js": [".tmp/concat/js/vendor2.js"],
					".tmp/concat/js/vendor3.js": [".tmp/concat/js/vendor3.js"]
				}
			}
		},
		compress: {
			main: {
				options: {
					mode: 'gzip'
				},
				//expand: true,
				//cwd: 'dist/',
				//src: ['**/*'],
				//dest: 'dist/',
				//ext:".gzip"

				files: [
					{
						expand: true,
						src: ["dist/js/**"],
						dest: "./",
						ext: ".js.gz"
					}
				]
			}
		},
		clean:{
			tmp:[
				".tmp/",
				"dist/assets",
				"dist/img",
				"dist/js",
				"dist/views",
				"dist/index.php",
				"!dist/config.js"
			]
		},

		jshint:{
			options:{
				reporter: require('jshint-stylish'),
				newcap:   false,
				laxbreak: true,
				loopfunc: true,
				debug:true,
				globals:{
					esversion: 5
				}
			},

			dev:[
				"Gruntfile.js", "scripts/**/*.js"
			]
		},

		//should just be for DIST
		purifycss: {
			options:{},
			dist1: {
				src: ["dist/index.php", "dist/views/**.html"], // HTML and JS
				css: ["dist/assets/css/compiled_styles.css"],
				dest: "dist/assets/css/compiled_styles.css"// CSS single file

			},

			dist2: {
				src: ["dist/index.php", "dist/views/**.html"], // HTML and JS
				css: ["dist/assets/css/vendor.css"],
				dest: "dist/assets/css/vendor.css"

			}


		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [
					{
						expand: true,
						src: [
							"dist/views/**.html",
							"!dist/views/set-campaign-builder.html",
							"!dist/views/set-legacy-campaign-builder.html",
							"!dist/views/ui-progressbars.html",
							"!dist/views/set-group.html"
						],
						dest: './' // will refer to dist/views as ./
					}
				]
				//files:{
				//	"dist/index.php": "dist/index.php",
				//	"dist/views/login.html": "dist/views/login.html"
				//}
			}
		},
		karma: require('./grunt/karma.js'),
        files: require('./grunt/files.js'),
        watch: require('./grunt/watch.js')

	});
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.registerTask('default', [
		"lint",
		"clean",
		"less",
		'copy:html',
		'copy:htmlViews',
		"copy:css",
		"copy:misc",
		'useminPrepare',
		'concat:generated',
		"ngAnnotate:hardGenerated",
		'uglify:generated',
		'cssmin:generated',
		'cssmin:target',
		'usemin',
		'cssmin',
		//"purifycss", // at the moment, removes more than it should
		"htmlmin",
		//'cssmin:afterall', // purifycss doesn't remove white space so we need to minify again here
	]);

	grunt.registerTask("lint", ["jshint:dev"]);
    grunt.registerTask('unit', ["karma:unit", "watch:unit"]);
    grunt.registerTask('unitonce', ["karma:unit"]);


};



























// Old gruntfile config
//module.exports = function(grunt) {
//
//    grunt.initConfig({
//        // html min having trouble with set-campaign-builder.html
//        //htmlmin: require('./grunt/htmlmin.js'),
//
//        "htmlangular": require('./grunt/htmlangular.js'),
//        "ngAnnotate":  require('./grunt/ngAnnotate.js'),
//        "concat":      require('./grunt/concat.js'),
//        "jshint":      require('./grunt/jshint.js'),
//        "uglify":      require('./grunt/uglify.js'),
//        "cssmin":      require('./grunt/cssmin.js'),
//        "server":      require('./grunt/server.js'),
//        "karma":       require('./grunt/karma.js'),
//        "watch":       require('./grunt/watch.js'),
//        "files":       require('./grunt/files.js'),
//        "clean":       require('./grunt/clean.js'),
//        "less":        require('./grunt/less.js'),
//        "open":        require('./grunt/open.js'),
//        "copy":        require('./grunt/copy.js')
//    });
//
//    grunt.loadTasks("./grunt/tasks");
//    require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
//
//    // Sets up files to "generated" for dev usage
//    //grunt.registerTask("default", ["less", "concat", "copy:dev", "server", /*"open",*/ "watch"]);
//
//    // Builds files to "build/" for production ready usage
//    // Must pass syntax validation tests for javascript
//    grunt.registerTask("build", ["clean:prod", "less", "concat", "cssmin", "ngAnnotate", "uglify", "copy:prod"]);
//
//
//    grunt.registerTask('default',  ["karma:unit", "jshint", "watch:unitlint"]);
//    grunt.registerTask('unitlint', ["karma:unit", "jshint", "watch:unitlint"]);
//    grunt.registerTask('unit',     ["clear", "karma:unit", "watch:unit"]);
//    grunt.registerTask('lint',     ["jshint",     "watch:hint"]);
//
//
//    grunt.registerTask('hinthtml', ['htmlangular']);
//};
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
