module.exports = {
  scripts: {
    files: ['app/**', 'cards/**', '!cards/*/node_modules/**', 'vendor/**', 'test/**',  'templates/**', 'scss/*.scss'],
    tasks: ['lock', 'build', 'unlock', 'jshint', 'qunit:all'],
    options: {
      nospawn: true
    }
  }
};
