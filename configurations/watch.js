module.exports = {
  scripts: {
    files: ['app/**', 'vendor/**', 'test/**',  'templates/**', 'scss/*.scss'],
    tasks: ['lock', 'build', 'unlock', 'jshint', 'qunit:all'],
    options: {
      nospawn: true
    }
  }
};
