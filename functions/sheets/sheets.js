const { GoogleSpreadsheet } = require('google-spreadsheet')
const sheetData = require('./sheetData')
const creds = require('./credentials')

exports.handler = async (event) => {
  try {
    const {sheet, row} = JSON.parse(event.body)

    const selectedSheet = sheetData[sheet]
    if (!selectedSheet) {
      throw new Error(`Sheet ${sheet} not found`)
    }

    const {id, title, columns} = selectedSheet
    const doc = new GoogleSpreadsheet(id)
    doc.useServiceAccountAuth(creds);

    await doc.loadInfo()
    const docsheet = doc.sheetsByTitle[title]

    const rowToAdd = columns.map((columName) => row[columName] || '')

    const addedRow = await docsheet.addRow(rowToAdd)

    console.log(`Added row ${addedRow.rowIndex} to sheet ${doc.title}`)

    return {
      statusCode: 200,
    }
  } catch (error) {
    const message = JSON.stringify({error: error.message || error.toString()})
    console.log(message)

    return {
      statusCode: 500,
      body: message
    }
  }
}
