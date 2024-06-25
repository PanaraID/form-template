/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const SHEET_NAME = "Sheet1"; // Nama tab Spreadsheet yang digunakan

/**
 * Fungsi utama untuk menangani POST request.
 * @param {object} e Objek event POST yang berisi data dari formulir.
 * @returns {object} Output JSON yang menunjukkan hasil operasi.
 */
function doPost(e) {
  try {
    const sheet = getSheetByName(SHEET_NAME); // Mendapatkan lembar (sheet) berdasarkan nama

    const headers = getSheetHeaders(sheet); // Mendapatkan header (nama kolom)

    validateRequiredParameters(headers, e.parameter); // Memvalidasi parameter yang diperlukan

    const newRow = createNewRow(headers, e.parameter); // Membuat objek newRow untuk data baru

    appendRowToSheet(sheet, newRow); // Menambahkan data baru ke lembar (sheet)

    return createSuccessResponse(newRow); // Memberikan respons sukses dengan data yang ditambahkan
  } catch (error) {
    console.error("Error: ", error);
    return createErrorResponse(error); // Memberikan respons error jika terjadi kesalahan
  }
}

/**
 * Fungsi untuk mendapatkan lembar (sheet) dari Spreadsheet berdasarkan nama.
 * @param {string} sheetName Nama lembar (sheet) yang dicari.
 * @returns {object} Objek lembar (sheet) yang ditemukan.
 * @throws {Error} Jika lembar (sheet) tidak ditemukan.
 */
function getSheetByName(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`Sheet '${sheetName}' tidak ditemukan dalam Spreadsheet.`);
  }
  return sheet;
}

/**
 * Fungsi untuk mendapatkan header (nama kolom) dari lembar (sheet) Spreadsheet.
 * @param {object} sheet Objek lembar (sheet) dari Spreadsheet.
 * @returns {array} Array yang berisi nama-nama kolom dari lembar (sheet) tersebut.
 */
function getSheetHeaders(sheet) {
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
}

/**
 * Fungsi untuk memvalidasi bahwa semua parameter yang diperlukan ada dalam data yang diterima.
 * @param {array} headers Array yang berisi nama-nama kolom (header).
 * @param {object} parameters Objek yang berisi parameter-parameter dari POST request.
 * @throws {Error} Jika ada parameter yang diperlukan tidak ada dalam data yang diterima.
 */
function validateRequiredParameters(headers, parameters) {
  const headersToValidate = headers.filter(header => header !== "timestamp"); // Menghilangkan header "timestamp" dari validasi
  const missingHeaders = headersToValidate.filter(header => !parameters[header]);
  if (missingHeaders.length > 0) {
    throw new Error("Parameter yang diperlukan tidak ada: " + missingHeaders.join(", "));
  }
}

/**
 * Fungsi untuk membuat objek newRow berdasarkan header dan parameter yang diterima.
 * @param {array} headers Array yang berisi nama-nama kolom (header).
 * @param {object} parameters Objek yang berisi parameter-parameter dari POST request.
 * @returns {object} Objek newRow yang berisi data yang akan ditambahkan ke Spreadsheet.
 */
function createNewRow(headers, parameters) {
  const newRow = {};
  headers.forEach(header => {
    newRow[header] = header === "timestamp" ? new Date() : parameters[header];
  });
  return newRow;
}

/**
 * Fungsi untuk menambahkan newRow ke lembar (sheet) Spreadsheet.
 * @param {object} sheet Objek lembar (sheet) dari Spreadsheet.
 * @param {object} newRow Objek yang berisi data baru yang akan ditambahkan.
 */
function appendRowToSheet(sheet, newRow) {
  sheet.appendRow(Object.values(newRow));
}

/**
 * Fungsi untuk membuat respons JSON yang menyatakan operasi berhasil.
 * @param {object} newRow Objek yang berisi data yang baru saja ditambahkan.
 * @returns {object} Output JSON yang menyatakan operasi berhasil beserta data yang ditambahkan.
 */
function createSuccessResponse(newRow) {
  return ContentService.createTextOutput(
    JSON.stringify({ result: "success", newRow: newRow })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Fungsi untuk membuat respons JSON yang menyatakan terjadi kesalahan.
 * @param {Error} error Objek error yang berisi informasi tentang kesalahan yang terjadi.
 * @returns {object} Output JSON yang menyatakan terjadi kesalahan beserta pesan kesalahan.
 */
function createErrorResponse(error) {
  return ContentService.createTextOutput(
    JSON.stringify({ result: "error", message: error.message })
  ).setMimeType(ContentService.MimeType.JSON);
}
