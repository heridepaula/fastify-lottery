const fs = require('fs')
const path = require('path')
const download = require('download')
const extract = require('extract-zip')
const moment = require('moment')
const HtmlTableToJson = require('html-table-to-json')
const request = require('request')
const { CronJob } = require('cron')

const TARGET_FOLDER = 'temp'

const start = async (url) => {

  (new CronJob('* 59 17-22 * * 3,6', async () => {

    const options = {
      headers: {
        'Referer': process.env.FILE_DOWNLOAD_REFERRER,
        'Cookie': process.env.FILE_DOWNLOAD_COOKIES
      }
    }

    try 
    {
      const zipFilePath = path.resolve(process.cwd(), `${TARGET_FOLDER}\\D_megase.zip`)
      const hmlFilePath = path.resolve(process.cwd(), `${TARGET_FOLDER}\\d_mega.htm`)
  
      await download(url, TARGET_FOLDER, options)
      await extract(zipFilePath, { dir: `${process.cwd()}\\${TARGET_FOLDER}`})
  
      const html = fs.readFileSync(hmlFilePath, 'latin1')
      const json = new HtmlTableToJson(html).results
  
      for (let result of json[0])
      {
        if (!isNaN(parseInt(result.Concurso))) {
          const array = [
            parseInt(result['1ª Dezena']),
            parseInt(result['2ª Dezena']),
            parseInt(result['3ª Dezena']),
            parseInt(result['4ª Dezena']),
            parseInt(result['5ª Dezena']),
            parseInt(result['6ª Dezena'])
          ]
          const game = {
            contest: parseInt(result.Concurso),
            date: moment(result[`Data Sorteio`], 'DD/MM/YYYY').toDate(),
            numbers: array.sort((x, y) => { return x - y }),
            winners: parseInt(result['Ganhadores_Sena']),
            prize: parseFloat(result['Rateio_Sena'].replace(/\./g, '').replace(/,/g, '.')),
            accumulated: result.Acumulado === 'SIM',
            accumulatedValue: parseFloat(result['Valor_Acumulado'].replace(/\./g, '').replace(/,/g, '.')),
          }
  
          await request({
            url: `${FASTIFY_LOTTERY_URL}/api/v1/mega-sena/`,
            method: 'POST',
            json: true,
            body: game
          })
        }
      }
  
    } catch (error) {
      console.log(error)
    }
  }, null, true, 'America/Los_Angeles')).start()
}

start(process.env.MEGASENA_FILE_URL)
