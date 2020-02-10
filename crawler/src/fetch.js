const fetch = require('node-fetch');

const options = require('command-line-args')([
  {
    name: 'url',
    alias: 'u',
    type: String,
    defaultOption: true,
  },
  {
    name: 'verbose',
    alias: 'v',
    type: Boolean,
  },
  {
    name: 'referrer',
    type: String
  }
]);

if (!options.url) {
  throw new TypeError('URL must be specified');
}

const init = (options) => {
  let value = {
    "credentials": "include",
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "ja,en-US;q=0.9,en;q=0.8",
      "cache-control": "max-age=0",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-site",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
    },
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors"
  };

  if (options.referrer) {
    value.referrer = options.referrer;
  }

  return value;
}

fetch(options.url, init(options))
  .then(async response => {
    const body = await response.text();
    process.stdout.write(body);
  })
  .catch(error => {
    throw error
  });
