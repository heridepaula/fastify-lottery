const fs = require('fs')
const path = require('path')
const download = require('download')
const extract = require('extract-zip')
const moment = require('moment')
const HtmlTableToJson = require('html-table-to-json')
const request = require('request-promise')
const { CronJob } = require('cron')


module.exports = async () => {

  (new CronJob('* 59 17-22 * * 3,6', async () => {

    const TARGET_FOLDER = path.resolve(process.cwd(), 'temp')

    const options = {
      headers: {
        'Referer': process.env.FILE_DOWNLOAD_REFERRER,
        'Cookie': process.env.FILE_DOWNLOAD_COOKIES
      }
    }

    try 
    {
      const zipFilePath = path.resolve(TARGET_FOLDER, 'D_megase.zip')
      const hmlFilePath = path.resolve(TARGET_FOLDER, 'd_mega.htm')

      if (!fs.existsSync(TARGET_FOLDER)){
        fs.mkdirSync(TARGET_FOLDER);
      }
  
      await download(process.env.MEGASENA_FILE_URL, TARGET_FOLDER, options)
      await extract(zipFilePath, { dir: TARGET_FOLDER})
  
      const html = fs.readFileSync(hmlFilePath, 'latin1')
      const parsedResults = new HtmlTableToJson(html).results
      const results = []

      for (let result of parsedResults[0])
      {
        if (!isNaN(parseInt(result.Concurso))) {

          const numbers = [
            parseInt(result['1ª Dezena']),
            parseInt(result['2ª Dezena']),
            parseInt(result['3ª Dezena']),
            parseInt(result['4ª Dezena']),
            parseInt(result['5ª Dezena']),
            parseInt(result['6ª Dezena'])
          ]

          results.push({
            contest: parseInt(result.Concurso),
            date: moment(result[`Data Sorteio`], 'DD/MM/YYYY').toDate(),
            result: numbers.sort((x, y) => { return x - y }),
            sixNumbersWinners: parseInt(result['Ganhadores_Sena']),
            sixNumbersPrize: parseFloat(result['Rateio_Sena'].replace(/\./g, '').replace(/,/g, '.')),
            fiveNumbersWinners: parseInt(result['Ganhadores_Quina']),
            fiveNumbersPrize: parseFloat(result['Rateio_Quina'].replace(/\./g, '').replace(/,/g, '.')),
            fourNumbersWinners: parseInt(result['Ganhadores_Quadra']),
            fourNumbersPrize: parseFloat(result['Rateio_Quadra'].replace(/\./g, '').replace(/,/g, '.')),
            accumulated: result.Acumulado === 'SIM',
            accumulatedValue: parseFloat(result['Valor_Acumulado'].replace(/\./g, '').replace(/,/g, '.')),
          })
        }
      }

      results.sort((x, y) => y.contest - x.contest)

      for (let result of results)
      {
        try {
          console.log(result)
          await request({
            url: `${process.env.FASTIFY_LOTTERY_URL}/api/v1/mega-sena/`,
            method: 'POST',
            json: true,
            body: result
          })
        } catch (ex) {
          console.log(ex.message)
          return;
        }
      }
  
    } catch (error) {
      console.log(error)
    }
  }, null, true, 'America/Los_Angeles')).start()
}