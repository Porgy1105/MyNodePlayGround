const puppeteer = require('puppeteer');

async function getLatestDate(page, url){
    await page.goto(url); // ページへ移動
    // 任意のJavaScriptを実行
    return await page.evaluate(() => document.querySelector('.newsList').children[0].firstChild.textContent.trim())
}

let tmp = !(async() => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const latestDate = await getLatestDate(page, 'http://www.uec.ac.jp/');
        console.log(`最新の新着情報の日付は${latestDate}です。`);

        browser.close();
        return latestDate;
    } catch(e) {
        console.error(e)
    }   
})()

module.exports.insert = tmp;


