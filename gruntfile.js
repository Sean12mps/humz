module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			dist: {
				files: {
					'pkg/assets/js/ext-main.min.js': ['app/ext-main.js'],
					'pkg/assets/js/ext-background.min.js': ['app/ext-background.js'],
				},
			},
		},
		htmlConvert: {
			options: {
				// custom options, see below
				rename: function( moduleName ) {
					moduleName = moduleName.replace('.html', '');
					moduleName = moduleName.replace('/app/templates/', '');
					moduleName = moduleName.replace('..', '');
					moduleName = moduleName.replace('-', '_');
					return moduleName;
				}
			},
			mytemplate: {
				src: ['app/templates/*.html'],
				dest: 'pkg/assets/js/ext-ui.min.js'
			},
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			my_target: {
				files: {
					// minify js
					'pkg/assets/js/ext-main.min.js': ['pkg/assets/js/ext-main.min.js'],
					'pkg/assets/js/ext-background.min.js': ['pkg/assets/js/ext-background.min.js'],
					'pkg/assets/js/ext-ui.min.js': ['pkg/assets/js/ext-ui.min.js'],
				}
			},
		},
		htmlmin: {
			dist: {											// Target 
				options: {									// Target options 
					removeComments: true,
					collapseWhitespace: true
				},
				files: {									// Dictionary of files 
					'pkg/index.min.html': 'app/templates/window-main.html',	// 'destination': 'source' 
					'pkg/settings.min.html': 'app/templates/window-settings.html'
				}
			},
		},
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'pkg/assets/css/style.min.css': 'app/sass/style.css',
				}
			}
		},
		cssmin: {
			options: {},
			target: {
				files: {
					'pkg/assets/css/style.min.css': ['pkg/assets/css/style.min.css']
				}
			}
		},
		watch: {
            options: { livereload: true }, // reloads browser on save
            scripts: {
                files: [
                	'app/*.js',
                	'app/modules/*.js',
                	'app/templates/*.html',
                	'app/sass/style.css',
                	'app/sass/mods/*.scss',
                	'app/sass/parts/*.scss'
                ],
                tasks: ['browserify','htmlConvert','sass','uglify','htmlmin','cssmin']
            }, //scripts
        }, //watch
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-html-convert');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Default task(s).
	grunt.registerTask('default', ['browserify','htmlConvert','sass','uglify','htmlmin','cssmin','watch']);

};