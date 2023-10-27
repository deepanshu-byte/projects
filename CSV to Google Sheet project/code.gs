function openSidebar() {
  var htmlOutput = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('CSV Importer')
    .setWidth(400);
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}

function importCSVData(csvData, targetSheetName) {
  try {
    // Implement CSV parsing and import logic here
    var parsedData = parseCSV(csvData);

    writeToSheet(parsedData, targetSheetName);

    return "CSV data imported successfully.";
  } catch (error) {
    return "Error: " + error.toString();
  }
}

function importLargeCSVData(csvData) {
  var reader = new StreamReader(csvData);
  var line;
  var parsedData = [];
  while ((line = reader.readLine()) !== null) {
    parsedData.push(line.split(','));
  }

  // Import the parsed data into Google Sheets
  writeToSheet(parsedData, "Imported Data"); // You can specify the target sheet name here
}

// Function to parse CSV data
function parseCSV(csvData) {
  var csvLines = csvData.split('\n');
  var parsedData = [];
  for (var i = 0; i < csvLines.length; i++) {
    parsedData.push(csvLines[i].split(','));
  }
  return parsedData;
}

function writeToSheet(data, sheetName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
}
