module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.package, //grunt.file.readJSON('package.json'),
        my: {
            vendor: 'bower_components',
            assetsRoot: 'vendor_assets',
            css: {
                main: 'css',
                entryFile: 'main.less',
                assets: '/assets', // relative to main (previous key)
                build: '/build'
            }
        },
        clean: {
            dev: {
                src: ['<%= my.css.main %><%= my.css.build %>', '<%= my.assetsRoot %>']
            }
        },
        copy: {
            bootstrap_assets: {
                files: [{
                    expand: true,
                    cwd: '<%= my.vendor %>',
                    src: ['bootstrap/dist/fonts/**/*'],
                    dest: '<%= my.assetsRoot %>'
                }]
            }
        },
        less: {
            dev: {
                options: {
                    paths: ['<%= my.css.main %>', '<%= my.vendor %>']
                },
                files: [{
                    expand: true, // Enable dynamic expansion.
                    cwd: '<%= my.css.main %>/', // Src matches are relative to this path.
                    src: '<%= my.css.entryFile %>', // Actual pattern(s) to match.
                    dest: '<%= my.css.main %><%= my.css.build %>', // Destination path prefix.
                    ext: '.css', // Dest filepaths will have this extension.
                    extDot: 'first' // Extensions in filenames begin after the first dot
                    /*rename: function(destination, source) {
                      return destination + '/' + source;
                      //return destination + '/' + '<%= pkg.name %>.css';
                    }*/
                }]
            },
            production: {
                options: {
                    paths: '<%= less.dev.options.paths %>',
                    cleancss: true
                },
                files: '<%= less.dev.files %>'
            }
        },
        delta: {
            /**
             * By default, we want the Live Reload to work for all tasks; this is
             * overridden in some tasks (like this file) where browser resources are
             * unaffected. It runs by default on port 35729, which your browser
             * plugin should auto-detect.
             */
            options: {
                livereload: true
            },
            /**
             * When the Gruntfile changes, we just want to lint it. In fact, when
             * your Gruntfile changes, it will automatically be reloaded!
             */
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: [],
                options: {
                    livereload: false
                }
            },
            /**
             * When the CSS files change, we need to compile and minify them.
             */
            less: {
                files: ['<%= my.css.main %>/**/*', '!<%= my.css.main %><%= my.css.build %>/**/*'],
                tasks: ['less:dev']
            },
            copy: {
                files: ['<%= my.vendor %>/**/*'],
                tasks: ['build']
            }
        }
    });

    // Load the plugins that provides the tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['clean:dev', 'copy', 'less:dev']);

    grunt.renameTask('watch', 'delta');
    grunt.registerTask('watch', ['build', 'delta']);

    // Default task(s).
    grunt.registerTask('default', ['build']);
};
