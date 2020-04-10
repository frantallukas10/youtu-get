const { isSpinnerVisible, scrollToBottom, getData } = require('./helpers.js');
const puppeteer = require('puppeteer');

const isValidId = (id) =>
  !Boolean(/^[\w\-]{12,}$/.exec(id)) || id.length !== 34;

const getYoutubeInfo = async (id) => {
  if (isValidId(id)) {
    return false;
  }
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ['--start-maximized'],
    timeout: 10000,
  });

  const page = (await browser.pages())[0];

  await page.setRequestInterception(true);

  await page.on('request', (req) => {
    if (
      req.resourceType() === 'image' ||
      req.resourceType() === 'stylesheet' ||
      req.resourceType() === 'font'
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto(`https://www.youtube.com/playlist?list=${id}`);

  let finishScroll = await isSpinnerVisible(page);

  while (finishScroll) {
    await scrollToBottom(page);
    finishScroll = await isSpinnerVisible(page);
  }
  const data = await getData(page);
  await browser.close();
  return data;
};

module.exports = { getYoutubeInfo, isValidId };
