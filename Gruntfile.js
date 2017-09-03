module.exports = function(grunt) {

    var pkg = require('./package.json');

    grunt.initConfig({

        buildcontrol: {
            options: {
                dir: './',
                commit: true,
                push: true,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            },
            pages: {
                options: {
                    remote: 'https://github.com/AaronMcCloskey/node-api.git',
                    branch: 'gh-pages'
                }
            },
            heroku: {
                options: {
                    remote: 'https://git.heroku.com/aaron-node-api.git',
                    branch: 'master',
                    tag: pkg.version
                }
            },
            local: {
                options: {
                    remote: '../',
                    branch: 'build'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-build-control');
};