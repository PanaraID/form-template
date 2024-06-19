const sheetName = 'Sheet1'; // Ganti sesuai nama tab dari spreadsheet
const scriptProp = PropertiesService.getScriptProperties();

function intialSetup() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidIndonesianPhone(phone) {
  // Regex to match Indonesian phone numbers:
  // Examples: 0812XXXXXXX, 0813-XXXX-XXXX, 62812XXXXXXX, +62812XXXXXXX, etc.
  const phoneRegex = /^(?:\+62|62|0)(?:\d{9,10}|\d{3,4}-\d{3,4}-\d{3,4})$/;
  return phoneRegex.test(phone);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    const sheet = doc.getSheetByName(sheetName);

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    //  Bagian yang akan dicek apakah semua dari yang berheader berikut sudah ada?,
    // mohon pastikan nama header yang akan dicek ini sama dengan data header di spreadsheet.
    // 
    //  Jika ada yang sudah ada, maka akan mengembalikan pesan error
    // jika tidak ada yang sudah ada, maka akan mengembalikan pesan sukses
    //
    //  Dan ada fitur pengecekan email dan phone yang valid juga di sini.
    const columnsToCheck = ['name', 'email', 'phone'];

    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headersIndex = headers.reduce((acc, header, index) => {
      acc[header] = index;
      return acc;
    }, {});

    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      let duplicateFound = true;
      for (let j = 0; j < columnsToCheck.length; j++) {
        const header = columnsToCheck[j];

        if (header === 'email' && !isValidEmail(e.parameter['email'])) {
          return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'Email format tidak valid!' }))
            .setMimeType(ContentService.MimeType.JSON);
        }

        if (header === 'phone' && !isValidIndonesianPhone(e.parameter['phone'])) {
          return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'Nomor telpon tidak valid!' }))
            .setMimeType(ContentService.MimeType.JSON);
        }

        duplicateFound &= row[headersIndex[header]] !== e.parameter[header];
      }
      if (duplicateFound) {
        return ContentService
          .createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'Data sudah ada!' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // If no duplicate found, add new row
    const newRow = headers.map(function (header) {
      return header === 'timestamp' ? new Date() : e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
