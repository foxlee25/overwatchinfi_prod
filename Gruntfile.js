/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    replace: {
      dev: {
        overwrite: true,
        src: ['./Client/views/FbBtnView.js'],
        replacements: [{
          from: '238534016527081',                   
          to: '239756926404790'
        }]
      },
      deploy: {
        overwrite: true,
        src: ['./Client/views/FbBtnView.js'],
        replacements: [{
          from: '239756926404790',                 
          to: '238534016527081'
        }]
      }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      copy: {
        main: {
          files:[
            {
              expand: true,
              src: [
              './**', 
              '!./Client/admins/**',
               '!./Client/components/**', 
               '!./Client/config/**', 
               '!./Client/flux/**',
               '!./Client/service/**',
               '!./Client/views/**',
               '!./Client/side-comments/**'
               ], 
              dest: '../overwatchinfi_prod/'

          }
          ]
        }
      },
      git_deploy: {
        target: {
          options: {
            branch: 'master',
            url: 'https://github.com/foxlee25/overwatchinfi_prod.git'
          },
          src: '../overwatchinfi_prod/'
        }
      }
  });

  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-git-deploy');

  //Switch to dev
  grunt.registerTask('dev', ['replace:dev']);

  //switch to deploy
  grunt.registerTask('deploy', ['replace:deploy']);

  grunt.registerTask('deploy_prod', ['copy','git_deploy:target']);

};
