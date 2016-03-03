module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify:{
            dist:{
                files:{
                    'scripts/tyloren.min.js':['scripts/tyloren.js']
                }
            }
        },
        cssmin:{
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'styles/css/style.min.css': ['styles/css/style.css']
                }
            }
        },
        // Sass
        sass: {
            options: {
                //sourceMap: true, // Create source map
                //outputStyle: 'compressed' // Minify output
            },
            dist: {
                files: [
                    {
                        expand: true, // Recursive
                        cwd: "styles/sass/", // The startup directory
                        src: ["**/*.scss"], // Source files
                        dest: "styles/css/", // Destination
                        ext: ".css" // File extension
                    }
                ]
            }
        },

        // Watch
        watch: {
            css: {
                files: ['**/*.scss'],
                tasks: ['sass','cssmin'],
                options: {
                    spawn: false
                }
            },
        }
    });
    grunt.registerTask('dev', ['sass', 'watch','cssmin']);
    grunt.registerTask('default', ['uglify','cssmin']);
};