require('dotenv').config()
const { google } = require('googleapis')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readline = require('readline')
const seedData = require('./seedData')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

module.exports = async () => {
  await authorize(getSpreadSheet)
}

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
const TOKEN_PATH = path.join(__dirname, 'token.json')

async function authorize(callback) {
  const sheetsAPI = new google.auth.OAuth2(
    process.env.GOOGLE_SHEET_ID,
    process.env.GOOGLE_SHEET_SECRET,
    process.env.GOOGLE_SHEET_REDIRECT
  )
  try {
    const token = await readFile(TOKEN_PATH)
    sheetsAPI.setCredentials(JSON.parse(token))
    callback(sheetsAPI)
  } catch (error) {
    getNewToken(sheetsAPI, callback)
  }
}

async function getSpreadSheet(auth) {
  const sheets = google.sheets({ version: 'v4', auth })
  const getSheets = promisify(sheets.spreadsheets.values.batchGet)
  try {
    const response = await getSheets({
      spreadsheetId: process.env.GOOGLE_SHEET,
      ranges: ['Sheet1', 'Sheet2']
    })
    if (response) {
      const [posts, users] = response.data.valueRanges.map(vr => vr.values.slice(1))
      seedData(posts, users)
    }
  } catch (error) {
    console.log('The API returned an error: ' + error)
  }
}

async function getNewToken(sheetsAPI, callback) {
  const authUrl = sheetsAPI.generateAuthUrl({ access_type: 'offline', scope: SCOPES })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question('Enter the code from that page here: ', code => {
    rl.close()
    sheetsAPI.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err)
      sheetsAPI.setCredentials(token)
      try {
        writeFile(TOKEN_PATH, JSON.stringify(token))
        callback(sheetsAPI)
      } catch (error) {
        console.error(error)
      }
    })
  })
}
