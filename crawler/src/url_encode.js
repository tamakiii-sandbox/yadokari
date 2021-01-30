const options = require('command-line-args')([
  {
    name: 'url',
    alias: 'u',
    type: String,
    defaultOption: true,
  }
]);

const input = require('fs').readFileSync('/dev/stdin', 'utf8');

if (!options.url && !input) {
  throw new TypeError('URL must be specified');
}

process.stdout.write(encodeURIComponent(options.url ? options.url : input));