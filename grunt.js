'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },

    test: {
      files: ["test/**/*.js"]
    },

    lint: {
      files: ["grunt.js",
        "app/js/**/*.js",
        "test/e2e/**/*.js",
        "test/unit/**/*.js"
      ]
    },

    watch: {
      /* https://github.com/gruntjs/grunt-contrib-watch/issues/20 */
      forceWatchMethod: 'old',
      dist: {
        files: ["app/**"],
        tasks: ["default"]
      }
    },

    macreload: {
      dist: {
        browser: 'chrome',
        editor: 'macvim'
      }
    },

    'handlebars-static': {
      dev: {
        partials: 'app/**/*.hbt',
        files: 'app/**/*.hbr',
        data:'context/*.json',
        replaceDir: 'app/',
        withDir: 'dist/'
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
        globalstrict: true
      },
      globals: {
        document: true,
        it: true,
        beforeEach: true,
        inject: true,
        describe: true,
        element: true,
        expect: true,
        browser: true,
        angular: true,
        feedback: true,
        MyCtrl1: true,
        MyCtrl2: true
      }
    },

    concat: {
      dist: {
        src: ['<banner:meta.banner>', 'app/**/*.js'],
        dest: 'dist/js/app.js'
      },
      vendor: {
        src: ['vendor/jquery-1.8.3.js',
              'vendor/angular/angular.js',
              'vendor/bootstrap/**/*.js'],
        dest: 'dist/js/vendor.js'
      },
      distcss: {
        src: ['app/**/*.css'],
        dest: 'dist/css/app.css'
      },
      vendorcss: {
        src: ['vendor/**/*.css'],
        dest: 'dist/css/vendor.css'
      }
    },

    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/js/<%= pkg.name %>.min.js'
      },
      vendor: {
        src: ['<config:concat.vendor.dest>'],
        dest: 'dist/js/vendor.min.js'
      }
    },

    cssmin: {
      dist: {
        src: '<config:concat.dist.dest>',
        dest: 'dist/css/app-min.css'
      },
      vendor: {
        src: '<config:concat.vendor.dest>',
        dest: 'dist/css/vendor-min.css'
      }
    },

    copy: {
      assets: {
        files: {
          "dist/myApp/partials/": "app/myApp/partials/*.html"
        }
      }
    },
  });

  grunt.registerTask('testacular', 'run tests', function () {
    var done = this.async();
    grunt.utils.spawn({
      cmd: process.platform === 'win32' ? 'scripts/test.bat' : 'scripts/test.sh'
    }, function (error, result, code) {
      if (error) {
        grunt.warn("Make sure the testacular server is online: run `grunt server`.\n" +
          "Also make sure you have a browser open to http://localhost:8080/.\n" +
          error.stdout + error.stderr);
        //the testacular runner somehow modifies the files if it errors(??).
        //this causes grunt's watch task to re-fire itself constantly,
        //unless we wait for a sec
        setTimeout(done, 1000);
      } else {
        grunt.log.write(result.stdout);
        done();
      }
    });
  });

  grunt.registerTask('testacular-e2e', 'run tests', function () {
    var done = this.async();
    grunt.utils.spawn({
      cmd: process.platform === 'win32' ? 'scripts/e2e-test.bat' : 'scripts/e2e-test.sh'
    }, function (error, result, code) {
      if (error) {
        grunt.warn("Make sure the testacular server is online: run `grunt server`.\n" +
          "Also make sure you have a browser open to http://localhost:8080/.\n" +
          error.stdout + error.stderr);
        //the testacular runner somehow modifies the files if it errors(??).
        //this causes grunt's watch task to re-fire itself constantly,
        //unless we wait for a sec
        setTimeout(done, 1000);
      } else {
        grunt.log.write(result.stdout);
        done();
      }
    });
  });

  grunt.registerTask('server-start', 'Start a custom web server.', function() {
      var done = this.async();
        grunt.log.writeln('Starting web server on http://localhost:8000');
          require('./server.js').listen(8000).on('close', done);
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-macreload');
  grunt.loadNpmTasks('grunt-handlebars-static');

  // Default task.
  grunt.registerTask("default", "handlebars-static lint concat copy macreload");
  grunt.registerTask("dist", "default min cssmin");
  grunt.registerTask("test", "default testacular");
  grunt.registerTask("e2e", "default testacular-e2e");
  grunt.registerTask("server", "default server-start");
};
