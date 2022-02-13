var CONFIG_FILE_ID = '1t5SVmkz0hxofvT2NHlMr3KJmypvKRwZv';

function readConfig(){
  const file = DriveApp.getFileById(CONFIG_FILE_ID);
  const data = file.getBlob().getDataAsString();
  return JSON.parse(data);
}