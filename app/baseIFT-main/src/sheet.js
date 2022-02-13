function getSheetData(sheetConfig, spreadSheetId){
  let data = getSheetDataFull(sheetConfig, spreadSheetId);
  [...Array(sheetConfig.row.data - 1)].forEach(_ => data.shift());
  return data;
}

function getSheetDataFull(sheetConfig, spreadSheetId){
  const ss = (spreadSheetId !== undefined) ? SpreadsheetApp.openById(spreadSheetId) : SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName(sheetConfig.name);
  return sheet.getDataRange().getValues();
}

function setText(sheetConfig, row, column, text){
  setList(sheetConfig, row, column, [[text]]);
}

function setList(sheetConfig, row, column, list){
  if(!list.length) return;
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetConfig.name);
  sheet.getRange(row, column, list.length, list[0].length).setValues(list);
}

function setListAnotherSheet(spreadSheetId, sheetConfig, row, column, list){
  if(!list.length) return;
  const sheet = SpreadsheetApp.openById(spreadSheetId).getSheetByName(sheetConfig.name);
  sheet.getRange(row, column, list.length, list[0].length).setValues(list);
}

function refreshSheet(sheetName, outList, startColumn, startRow, spreadSheetId){
  
  if(!outList[0].length) return;
  const sheet = getSheet(sheetName, spreadSheetId);

  startRow = startRow ? startRow : 2;
  startColumn = startColumn ? startColumn : 1;
  sheet.getRange(startRow, startColumn, sheet.getLastRow(), outList[0].length).clear();
  sheet.getRange(startRow, startColumn, outList.length, outList[0].length).setValues(outList);
}

function addSheet(sheetConfig, column, list){
  if(!list.length) return;
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetConfig.name);
  sheet.insertRows(sheetConfig.row.data, list.length);
  sheet.getRange(sheetConfig.row.data, column, list.length, list[0].length).setValues(list);
}

function addSheetLastRow(sheetConfig, list, column, spreadSheetId){
  if(!list.length) return;

  const sheet = getSheet(sheetConfig.name, spreadSheetId);

  sheet.getRange(
    sheet.getLastRow() + 1,
    column !== undefined ? column : 1,
    list.length,
    list[0].length
  ).setValues(list);
}

function getSheet(sheetName, spreadSheetId){
  const ss = (spreadSheetId !== undefined) ? SpreadsheetApp.openById(spreadSheetId) : SpreadsheetApp.getActive();
  return ss.getSheetByName(sheetName);
}
