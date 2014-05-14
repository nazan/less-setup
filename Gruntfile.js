module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        my: {
          vendor: 'bower_components',
          css: {
            main: 'css',
            entryFile: 'main.less',
            assets: '/assets', // relative to main (previous key)
            build: '/build'
          }
        },
        clean: {
            dev: {
                src: ['<%= my.css.main %><%= my.css.build %>']
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
        }
    });

    // Load the plugins that provides the tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    

    // Default task(s).
    grunt.registerTask('default', ['clean:dev', 'less:dev']);
};