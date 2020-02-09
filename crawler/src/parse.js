const options = require('command-line-args')([
  {
    name: 'verbose',
    alias: 'v',
    type: Boolean,
  },
  {
    name: 'executable',
    alias: 'e',
    type: String,
    defaultValue: '/usr/bin/chromium-browser',
  },
  {
    name: 'port',
    alias: 'p',
    type: Number,
  },
  {
    name: 'address',
    alias: 'a',
    type: String,
  },
  {
    name: 'timeout',
    alias: 't',
    type: Number,
    defaultValue: 1000,
  }
]);

// const input = require('fs').readFileSync('/dev/stdin', 'utf8');
// process.stdout.write(input);

const puppeteer = require('puppeteer-core');

(async() => {
  const browser = await puppeteer.launch({
    executablePath: options.executable,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--diable-gpu',
      options.address ? `--remote-debugging-address=${options.address}` : undefined,
      options.port ? `--remote-debugging-port=${options.port}` : undefined,
    ].filter(e => e)
  });

  const page = await browser.newPage();
  await page.goto('https://www.google.co.jp/');
  await page.screenshot({
    path: 'example.png'
  });

  page.on("close", async (e, args) => {
    await browser.close();
    console.log('done(success)');
  });

  page.on("request", (request, args) => {
    console.log('on request');
    console.log(request, args);
  });

  setTimeout(async () => {
    await browser.close();
  }, options.timeout);
})();
