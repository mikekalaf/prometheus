(function () {
    module.exports = function(grunt) {

        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-compress');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-sass');

        grunt.initConfig({
            concat: {
                css: {
                    src: [
                        'app/assets/css/bootstrap.css',
                        'bower_components/font-awesome/css/font-awesome.css',
                        'app/assets/css/main.css'],
                    dest: 'app/assets/css/app.css'
                },
                app: {
                    options: {
                        separator:';'
                    },
                    src: [
                        'bower_components/jquery/dist/jquery.js',
                        'app/assets/js/bootstrap.js',
                        'app/assets/js/math.min.js',
                    ],
                    dest: 'app/assets/js/app.js'
                }
            },
            cssmin: {
                css: {
                    files: {
                        'app/assets/css/app.min.css': ['app/assets/css/app.css']
                    }
                }
            },
            uglify: {
                options: {
                    mangle: false
                },
                app: {
                    files: {
                        'app/assets/js/app.min.js': ['app/assets/js/app.js']
                    }
                }
            },
            watch: {
                options: {
                    cwd: 'app/assets/'
                },
                js: {
                    files: [
                        'js/*.js'
                    ],
                    tasks: ['concat:app', 'uglify:app', 'compress']
                },
                css: {
                    files: [
                        '**/*.scss'
                    ],
                    tasks: ['sass', 'concat:css', 'cssmin:css', 'compress']
                }

            },
            sass: {
              dist: {
                options: {
                  sourcemap: 'none'
                },
                files: [{
                  expand: true,
                  cwd: 'app/assets/sass',
                  src: ['*.scss'],
                  dest: 'app/assets/css',
                  ext: '.css'
                }]
              }
            },
            compress: {
                main: {
                    options: {
                        mode: 'gzip'
                    },
                    files: [
                        {src: ['app/assets/js/app.min.js'], dest: 'app/assets/js/app.min.gz.js'},
                        {src: ['app/assets/css/app.min.css'], dest: 'app/assets/css/app.min.gz.css'},
                    ]
                }
            }
        });

        grunt.registerTask('default', ['sass', 'concat:css', 'concat:app', 'cssmin:css', 'uglify:app', 'compress']);
        grunt.registerTask('js', ['concat:app', 'uglify:app', 'compress']);

    }
})();
