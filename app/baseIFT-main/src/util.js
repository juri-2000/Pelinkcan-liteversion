function isExist(text) {
  return text !== '';
}

function isFriday(moment){
  return moment.format('ddd') === 'Fri';
}

function getDataFromGz(blob){

  blob.setContentType('application/x-gzip');
  blob = Utilities.ungzip(blob);

  return parseCsv(blob);
}

function parseCsv(blob){

  const data = blob.getDataAsString('utf-8');
  return Utilities.parseCsv(data);
}

