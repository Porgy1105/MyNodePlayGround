const puppeteer = require('puppeteer');

// 開発時は unhandledRejection を subscribe する
process.on('unhandledRejection', (e) => console.log(e))

async function getKeiouTimeTable(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);

  const timeTable = await page.evaluate(() => {
    let result = [];
    let hourEle = document.getElementsByClassName("weekday");

    for (let i = 0, l = hourEle.length; i < l; i++) {
      let minitesTd = hourEle[i].nextElementSibling;
      let minitesEleList = minitesTd.getElementsByTagName('span');
      let timeTableObj = {};
      let minitesList = [];

      for (let j = 0, m = minitesEleList.length; j < m; j++) {
        let minutes = minitesEleList[j].innerText.replace(/[^0-9]/g, '');
        if (minutes) {
          minitesList.push(minutes);
        }
      }

      timeTableObj[hourEle[i].innerText] = minitesList;

      result.push(timeTableObj);
    }

    return result;
  });

  console.log(timeTable);

  await browser.close();
}

// 新宿下り
getKeiouTimeTable("http://keio.ekitan.com/pc/T5?dw=0&slCode=263-1&d=2");