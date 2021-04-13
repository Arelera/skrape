import fs from 'fs'
import puppeteer from 'puppeteer'

export default async (req, res) => {
  const query = req.query.query
  const willScreenshot = true

  const browser = await puppeteer.launch({ headless: true })
  const today = new Date().getDate()
  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })

  await page.goto(`https://www.google.com/search?q=${query}`)

  let queryData = await page.evaluate(() => {
    let queries = []
    let queriesEls = document.querySelectorAll('div.g')
    queriesEls.forEach((queryEl) => {
      let resultJson = {}
      try {
        resultJson.name = queryEl.querySelector('h3').innerText
        resultJson.domain = queryEl.querySelector('cite').innerText
        resultJson.pageDate = queryEl.querySelector('span.f').innerText
      } catch (e) {
        queries.push(resultJson)
      }
    })
    return queries
  })

  console.dir(queryData)
  if (willScreenshot) {
    await page.screenshot({
      path: `./public/screenshots/${today}-${query}.jpg`,
      type: 'jpeg',
    })
    console.log('Your screenshots are ready!')
  }

  const data = JSON.stringify(queryData)

  fs.writeFile(`./public/search_results/${query}.json`, data, 'utf8', (err) => {
    if (err) {
      console.log(`Error writing file ${err}`)
    } else {
      console.log(`Query of ${query} is written successfully!`)
    }
  })

  console.log('Done!')
  const filePath = `/screenshots/${today}-${query}.jpg`
  res.status(200).json({ query, data, filePath })
}
