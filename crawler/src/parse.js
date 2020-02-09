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

const input = require('fs').readFileSync('/dev/stdin', 'utf8');

if (options.verbose) {
  process.stdout.write(input);
}

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
      '--lang=ja-jp,jp',
    ].filter(e => e)
  });

  const page = await browser.newPage();
  await page.setContent(input);
  // await page.goto('https://www.google.co.jp/');
  // await page.screenshot({
  //   path: 'example.png'
  // });

  const jsonize = function(nodes) {
    if (nodes.childElementCount > 0) {
      return {
        name: nodes.nodeName,
        body: Array.from(nodes.childNodes)
          .map(node => jsonize(node))
          .filter(x => x)
      }
    }

    const node = nodes;

    if (node.nodeName === '#text') {
      if (node.wholeText.trim().length === 0) {
        return undefined;
      }
      return {
        name: node.nodeName,
        body: node.wholeText.trim(),
      }
    } else if (node.nodeName === 'A') {
      return {
        name: node.nodeName,
        body: node.textContent,
        href: node.href,
      };
    }

    return {
      name: node.nodeName,
      body: node.textContent,
    }
  };

  class __Custom__ {
    static jsonize(nodes) {
      if (nodes.childElementCount > 0) {
        console.log(this.jsonize);
        return {
          name: nodes.nodeName,
          body: Array.from(nodes.childNodes)
            .map(node => this.jsonize(node))
            .filter(x => x)
        }
      }

      const node = nodes;

      if (node.nodeName === '#text') {
        if (node.wholeText.trim().length === 0) {
          return undefined;
        }
        return {
          name: node.nodeName,
          body: node.wholeText.trim(),
        }
      } else if (node.nodeName === 'A') {
        return {
          name: node.nodeName,
          body: node.textContent,
          href: node.href,
        };
      }

      return {
        name: node.nodeName,
        body: node.textContent,
      }
    }
  };

  await page.addScriptTag({
    content: __Custom__.toString()
  })

  const evaluates = [];

  evaluates.push(
    page.evaluate(() => {
      const title = Array.from(
          document.querySelector("#main > div:nth-child(1) > div.group_inner.event_header_area > h2").childNodes
        )
        .filter(node => node.nodeName === '#text')
        .map(node => node.wholeText)
        .join('')
        .trim();

      return {
        title
      };
    })
  );

  page.evaluate(() => {}, 'hoge');

  const getDetail = () => {
    const main = document.querySelector('#main > div:nth-child(3) div#editor_area');

    return {
      detail: __Custom__.jsonize(main)
    };
  };

  evaluates.push(page.evaluate(getDetail));

  Promise.all(evaluates)
    .then(results => {
      // console.log('ok');
      console.log(JSON.stringify(results));
    })
    .catch(error => {
      console.log(error);
    })
    .finally(async () => {
      // await browser.close();
    });

  // page.on("close", async (e, args) => {
  //   await browser.close();
  //   console.log('done(success)');
  // });

  // page.on("request", (request, args) => {
  //   console.log('on request');
  //   console.log(request, args);
  // });

  setTimeout(async () => {
    await browser.close();
  }, options.timeout);
})();
