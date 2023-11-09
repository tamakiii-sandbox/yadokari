const options = require('command-line-args')([
  {
    name: 'url',
    type: String,
    defaultOption: true,
  },
  {
    name: 'protocol',
    type: Boolean,
  },
  {
    name: 'hostname',
    type: Boolean,
  },
  {
    name: 'pathname',
    type: Boolean,
  },
  {
    name: 'search',
    type: Boolean,
  }
]);

if (!options.url) {
  throw new TypeError('URL must be specified');
}

const main = function(options) {
  const url = new URL(options.url);
  if (options.protocol) {
    return url.protocol;
  } else if (options.hostname) {
    return url.hostname;
  } else if (options.pathname) {
    return url.pathname;
  } else if (options.search) {
    return url.search;
  }

  throw new Error('Invalid argument');
}

process.stdout.write(main(options));