const router = require('express').Router();

const puppeteer = require('puppeteer');
const numOfPages = 4;
const fetchTheNews = async () => {
  const arr = [];

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    for (let i = 1; i <= numOfPages; i++) {
      await page.goto(`https://news.ycombinator.com/news?p=${i}`);

      const links = await page.$$eval('.storylink', (stories) =>
        stories.map((s) => {
          return { title: s.innerText, link: s.href };
        })
      );

      const votes = await page.$$eval('.subtext', (stories) => {
        return stories.map((story) => {
          return { votes: story.innerText.split(' ')[0] };
        });
      });

      votes.forEach(({ votes }, index) => {
        if (votes > 99) {
          arr.push({ votes, ...links[index] });
        }
      });
    }
    await browser.close();
    return arr;
  } catch (error) {
    console.log(error);
  }
};

fetchTheNews();

router.get('/api/news', async (request, response) => {
  try {
    const news = await fetchTheNews();
    response.json(news);
  } catch (error) {
    response.json(error.message);
  }
});

module.exports = router;
