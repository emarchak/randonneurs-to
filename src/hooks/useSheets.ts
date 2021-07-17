import fetch from 'isomorphic-unfetch'

const sheets = [
  'registration',
  'registration-permanent',
  'covid-screening'
]

type addRowParams = {
  sheet: string,
  row: {
    [key: string]: string | boolean
  }
}

export const useSheets = () => {
  const addRow = async ({sheet, row}: addRowParams) => {
    if (sheets.indexOf(sheet) === -1) {
      throw new Error(`Invalid sheet: ${sheet}`)
    }
    const formattedRow = {}
    
    Object.keys(row).forEach((key) => {
      if (typeof row[key] === 'boolean') {
        formattedRow[key] = row[key] ? 'Yes' : 'No'
      } else {
        formattedRow[key] = row[key]
      }
    })

    try {
      const response = await fetch('/.netlify/functions/sheets', {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: JSON.stringify({
          sheet,
          row: formattedRow
        }),
      })
      
    return response.ok
    }
    catch (err) {
      return false
    }
  }


  return {
    addRow,
  }
}
