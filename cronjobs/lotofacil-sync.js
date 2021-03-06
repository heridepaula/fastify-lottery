const fs = require('fs')
const path = require('path')
const download = require('download')
const extract = require('extract-zip')
const moment = require('moment')
const HtmlTableToJson = require('html-table-to-json')
const request = require('request-promise')
const { CronJob } = require('cron')


module.exports = async () => {

  (new CronJob('* 59 17-23 * * 1,2,3,4,5,6', async () => {
    const TARGET_FOLDER = path.resolve(process.cwd(), 'temp')

    const options = {
      headers: {
        'Referer': process.env.FILE_DOWNLOAD_REFERRER,
        'Cookie': process.env.FILE_DOWNLOAD_COOKIES
      }
    }

    try 
    {
      const zipFilePath = path.resolve(TARGET_FOLDER, 'D_lotfac.zip')
      const hmlFilePath = path.resolve(TARGET_FOLDER, 'd_lotfac.htm')

      if (!fs.existsSync(TARGET_FOLDER)){
        fs.mkdirSync(TARGET_FOLDER);
      }
  
      await download(process.env.LOTOFACIL_FILE_URL, TARGET_FOLDER, options)
      await extract(zipFilePath, { dir: TARGET_FOLDER})
  
      const html = fs.readFileSync(hmlFilePath, 'latin1')
      const parsedResults = new HtmlTableToJson(html).results
      const results = []

      for (let result of parsedResults[0])
      {
        if (!isNaN(parseInt(result.Concurso))) {

          const numbers = [
            parseInt(result['Bola1']),
            parseInt(result['Bola2']),
            parseInt(result['Bola3']),
            parseInt(result['Bola4']),
            parseInt(result['Bola5']),
            parseInt(result['Bola6']),
            parseInt(result['Bola7']),
            parseInt(result['Bola8']),
            parseInt(result['Bola9']),
            parseInt(result['Bola10']),
            parseInt(result['Bola11']),
            parseInt(result['Bola12']),
            parseInt(result['Bola13']),
            parseInt(result['Bola14']),
            parseInt(result['Bola15']),
          ]

          results.push({
            contest: parseInt(result.Concurso),
            date: moment(result[`Data Sorteio`], 'DD/MM/YYYY').toDate(),
            result: numbers.sort((x, y) => { return x - y }),
            fifteenNumbersWinners: parseInt(result['Ganhadores_15_Números']),
            fifteenNumbersPrize: parseFloat(result['Valor_Rateio_15_Números'].replace(/\./g, '').replace(/,/g, '.')),
            fourteenNumbersWinners: parseInt(result['Ganhadores_14_Números']),
            fourteenNumbersPrize: parseFloat(result['Valor_Rateio_14_Números'].replace(/\./g, '').replace(/,/g, '.')),
            thirteenNumbersWinners: parseInt(result['Ganhadores_13_Números']),
            thirteenNumbersPrize: parseFloat(result['Valor_Rateio_13_Números'].replace(/\./g, '').replace(/,/g, '.')),
            twelveNumbersWinners: parseInt(result['Ganhadores_12_Números']),
            twelveNumbersPrize: parseFloat(result['Valor_Rateio_12_Números'].replace(/\./g, '').replace(/,/g, '.')),
            elevenNumbersWinners: parseInt(result['Ganhadores_11_Números']),
            elevenNumbersPrize: parseFloat(result['Valor_Rateio_11_Números'].replace(/\./g, '').replace(/,/g, '.')),
            accumulated: parseFloat(result['Acumulado_15_Números'].replace(/\./g, '').replace(/,/g, '.')) > 0,
            accumulatedValue: parseFloat(result['Acumulado_15_Números'].replace(/\./g, '').replace(/,/g, '.')),
          })
        }
      }

      results.sort((x, y) => y.contest - x.contest)

      for (let result of results)
      {
        try {
          await request({
            url: `${process.env.FASTIFY_LOTTERY_URL}/api/v1/lotofacil/`,
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
  }, null, true, process.env.TZ)).start()
}