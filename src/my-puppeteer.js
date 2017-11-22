const puppeteer = require('puppeteer');

async function spa_access() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("http://keio.ekitan.com/pc/T5?dw=0&slCode=263-1&d=1");

  const _tmp = await page.evaluate(() => {
    const ele = document.getElementsByClassName("k_1301");
    const array = [];

    for (let i = 0, l = ele.length; i < l; i++) {
      array.push(ele[i].innerText);
    }

    return array;
  });

  console.log(_tmp);

  await browser.close();
}

// 開発時は unhandledRejection を subscribe する
process.on('unhandledRejection', (e) => console.log(e))

spa_access();