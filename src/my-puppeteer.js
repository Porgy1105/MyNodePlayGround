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
      let timeTableObj = {};
      let minitesList = [];

      let minitesTd = hourEle[i].nextElementSibling;
      let minitesEleList = minitesTd.getElementsByTagName('span');

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

async function getJRTimeTable(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);

  const timeTable = await page.evaluate(() => {
    let result = [];
    let timeTableEle = document.getElementsByTagName("table")[0];
    let timeTabletTrList = timeTableEle.querySelectorAll('tr:nth-child(n+3)');

    for (let i = 0, l = timeTabletTrList.length; i < l; i++) {
      let timeTableObj = {};
      let minitesList = [];

      let minitesTd = timeTabletTrList[i].lastElementChild;
      let minitesEleList = minitesTd.querySelectorAll('div.timetable_time');

      for (let j = 0, m = minitesEleList.length; j < m; j++) {
        let minutesObj = {};

        // 電車種別の取得
        let trainText = minitesEleList[j].getAttribute('data-train');
        if (trainText !== "無印") {
          minutesObj.train = trainText;
        } else {
          minutesObj.train = "";
        }

        // 行き先の取得
        let destinationText = minitesEleList[j].getAttribute('data-dest');
        if (destinationText !== "無印") {
          minutesObj.destination = destinationText;
        } else {
          minutesObj.destination = "";
        }

        // 時刻の取得
        let minutesText = minitesEleList[j].querySelector("span.minute").innerText.replace(/[^0-9]/g, '');
        if (minutesText) {
          minutesObj.minutes = minutesText;
          minitesList.push(minutesObj);
        }
      }

      let hour = timeTabletTrList[i].firstElementChild.innerText;
      timeTableObj[hour] = minitesList;

      result.push(timeTableObj);
    }

    return result;
  });

  console.log(timeTable);

  await browser.close();
}

// 新宿下り
//getKeiouTimeTable("http://keio.ekitan.com/pc/T5?dw=0&slCode=263-1&d=2");

// 川崎-東海道-平日-上り
//getJRTimeTable("http://www.jreast-timetable.jp/1712/timetable/tt0526/0526020.html");

// 川崎-南武線-平日-下り
getJRTimeTable("http://www.jreast-timetable.jp/1712/timetable/tt0526/0526030.html");
